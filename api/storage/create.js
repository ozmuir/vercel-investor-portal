import { getIsAdminOr403 } from "../../api/utils.js";
import { createAdminClient } from "../../api/utils.js";
import { BUCKET, ACCEPT_TYPE } from "../../src/variables.js";

// "POST"
export default async function handler(req, res) {
  if (!getIsAdminOr403(req, res)) {
    return;
  }

  const adminClient = createAdminClient();
  adminClient.storage
    .createBucket(BUCKET, {
      public: false,
      allowedMimeTypes: ACCEPT_TYPE,
      fileSizeLimit: 10485760, // 10m
    })
    .then(({ data, error }) => {
      if (error) {
        // const raw = JSON.parse(error.raw);
        // console.log(raw.code);
        // console.log(raw.httpStatusCode);
        if (error.message === "The resource already exists") {
          res.status(200).json({ data: { status: "EXIST" } });
        } else {
          res.status(400).json({ error });
        }
      } else {
        res.status(200).json({ data: { status: "CREATED" } });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: { message: error.message } });
    });
}
