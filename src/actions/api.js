import { getSession } from "../state/session.js";

export async function server() {
  const session = await getSession();
  if (!session) throw new Error("Cannot access API without session.");
  return api(session, ...arguments);
}

function api(session, method, uri, values) {
  if (["GET", "POST"].indexOf(method) === -1) {
    throw new Error(`API method is not in [GET, POST]: ${method}`);
  }
  const headers = {
    Authorization: `Bearer ${session.access_token}`,
    // Accept: "application/json",
  };
  const options = { headers };
  options.method = method;
  const hostname =
    "development" === process.env.NODE_ENV ? "http://localhost:3000" : "";
  let url = `${hostname}${uri}`;
  if (values) {
    if (method === "GET") {
      url += "?" + new URLSearchParams(values); // non-primitive values will be stringified!
    } else if (method === "POST") {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(values);
    }
  }
  return fetch(url, options).then((res) => res.json());
}
