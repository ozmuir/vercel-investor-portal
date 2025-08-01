import { getAuthenticatedUserIdOr401 } from "../../api/utils.js";
import { createAdminClient } from "../../api/utils.js";

// "POST"
export default async function handler(req, res) {
  const userId = await getAuthenticatedUserIdOr401(req, res);
  if (!userId) {
    return;
  }
  // This uses admin key but does not require admin access,
  // it just deletes the current userId
  const adminClient = createAdminClient();
  adminClient.auth.admin
    .deleteUser(userId)
    .then(({ data, error }) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json({ data: { status: "DELETED" } });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: { message: error.message } });
    });
}
