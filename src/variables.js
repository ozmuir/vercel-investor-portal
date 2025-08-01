export const BUCKET = "investor-documents";

export const ACCEPT_TYPE = [
  "application/pdf",
  "image/jpg",
  "image/png",
  "image/tiff",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const FILE_TYPES_IMAGE = ["image/jpg", "image/png", "image/tiff"];
export const FILE_TYPES_DOCUMENT = [
  "application/pdf",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const TABLE_INVESTMENTS = "investments";

export const TABLE_REQUESTS = "requests";

export const STATUS = Object.freeze({
  // DB value -> label
  CREATED: "CREATED",
  WAITING: "WAITING",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED",
});
export const statusOptions = Object.entries(STATUS).map(([key, val]) => ({
  label: val,
  value: key,
}));

export const LENGTH_MAX_COMMENT = 70;
export const LENGTH_MIN_REQUEST_SUMMARY = 5;
export const LENGTH_MAX_REQUEST_SUMMARY = 70;
export const LENGTH_MIN_REQUEST_DETAILS = 50;
export const LENGTH_MAX_REQUEST_DETAILS = 2000;
export const LENGTH_MAX_RESPONSE_NOTE = 2000;
