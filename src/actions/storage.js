import { ref } from "vue";
import { server } from "../actions/api.js";
import { supabase } from "../actions/supabase";
import { sessionRef } from "../state/session";
import { sanitizeFilenameAddUid, truthy } from "../utils";
import { BUCKET } from "../variables";

// import { FileObject } from '@supabase/storage-js'

// recursive
const getFiles = async (
  path,
  options = {
    limit: 100,
    offset: 0, // TODO
    sortBy: { column: "name", order: "asc" },
  }
) => {
  const result = [];
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(path, options);
  if (error) {
    console.error(`Error reading files from ${path}:`, error.message);
    return { data, error };
  }
  for (let file of data) {
    // A real file always has an ID.
    // A directory only has a name and no ID.
    if (file.id) {
      file.path = path;
      result.push(file);
    } else {
      const { data, error } = await getFiles(`${path}/${file.name}`, options);
      if (error) {
        return { data, error };
      }
      result.push(...data);
    }
  }
  return { data: result, error: null };
};

export function useFilesRef() {
  const iRef = ref([]);
  // const iRef = ref<FileObject[]>([]);
  const iLoadingRef = ref(false);
  const iLoad = async (folder) => {
    iLoadingRef.value = true;
    const { data, error } = await supabase.from("view_files_v2").select("*");
    iRef.value = data || [];
    if (error) {
      console.error(`Error fetching files:`, error.message);
    } else {
      console.log(`Fetched files:`, data);
    }
    iLoadingRef.value = false;
  };
  return [iRef, iLoadingRef, iLoad];
}

const SIGNED_URL_TIMEOUT = 60; // 60s access
const _signedUrlCache = {};

export const fileOpen = async (filePath, params = {}) => {
  if (!_signedUrlCache[filePath]) {
    const fileName = filePath.split("/").pop();
    const timeout = SIGNED_URL_TIMEOUT;
    const { download = false, is_admin = false } = params;
    const options = download ? { download: fileName } : {};
    let data, error;
    if (is_admin) {
      ({ data, error } = await server("GET", "/api/storage/signed_url", {
        filePath,
        timeout,
        options,
      }));
    } else {
      ({ data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(filePath, timeout, options));
    }

    if (error) {
      console.error("Error fetching the file URL:", error.message);
    } else {
      console.log("Fetched the file URL:", data);

      _signedUrlCache[filePath] = data.signedUrl;
      setTimeout(() => {
        delete _signedUrlCache[filePath];
      }, timeout * 1000);
    }
  }

  open(_signedUrlCache[filePath]);
};

function open(url) {
  if (!url) return;
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function fileUpload(file, subfolder = "", metadata = {}) {
  const session = sessionRef.value;
  const profile = session.profile;

  const folder = profile.id;
  const fileName = sanitizeFilenameAddUid(file.name);

  // metadata.profile_id = profile.id; // ???

  const path = [folder, subfolder].filter(truthy).join("/");
  const filePath = [path, fileName].filter(truthy).join("/");

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      // cacheControl: "3600",
      // upsert: false,
      metadata, // "user_metadata" in the database
    });

  if (error) {
    console.error("Error uploading a file:", error.message);
  } else {
    console.log("Uploaded a file:", data);
  }
  return { data, error };
}

// To RENAME a file, copy it to a new path and delete the old one
// await supabase.storage.from('user-uploads').copy('oldpath.pdf', 'newpath.pdf')
// await supabase.storage.from('user-uploads').remove(['oldpath.pdf'])

export async function filesDelete(files) {
  console.log(files);
  const filePaths = files.map((file) => file.name);
  console.log(filePaths);
  const { data, error } = await supabase.storage.from(BUCKET).remove(filePaths);
  if (error) {
    console.error("Error deleting files:", error.message);
  } else {
    console.log("Deleted files:", data);
  }
  return { data, error };
}
