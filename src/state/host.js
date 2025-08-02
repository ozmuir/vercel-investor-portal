const { host } = document.location;
export const isLocal =
  host.indexOf("localhost") !== -1 || host.indexOf("127.0.0.1") !== -1;
export const isOT = host.indexOf("orthogonalthinker") !== -1;
export const isEI = host.indexOf("ei.ventures") !== -1;
