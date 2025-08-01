import { getIsAdminOr403 } from "../../api/utils.js";
import { bodyParser } from "../../api/utils.js";
import { createAdminClient } from "../../api/utils.js";
import { BUCKET } from "../../src/variables.js";

// "GET"
export default async function handler(req, res) {
  if (!getIsAdminOr403(req, res)) {
    return;
  }

  const payload = await bodyParser(req);
  let { filePath, timeout, options } = payload;
  timeout = parseInt(timeout);

  const adminClient = createAdminClient();
  const signedUrl = await adminClient.storage
    .from(BUCKET)
    .createSignedUrl(filePath, timeout, options);

  if (signedUrl.error) {
    res.status(400).json({ error: signedUrl.error.message });
    return;
  }

  res.status(200).json({ data: signedUrl.data });
}
