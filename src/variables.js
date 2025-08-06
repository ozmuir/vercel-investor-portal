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

export const COLORS_EI = {
  blue: "#26427e",
  pink: "#ff0088",
  purple: "#7766ff",
  cyan: "#00ffee",
};

export const COLORS_OT = {
  high: "#ffffff",
  mid: "#999999",
  low: "#444444",
};

export const ENTITY_OT = "Orthogonal Thinker, Inc.";
export const ENTITY_EI = "Ei.Ventures, Inc.";
export const SHARE_PRICE_EI_VENTURES = 4.94;
export const SHARE_PRICE_ORTHOGONAL = 4.2;
