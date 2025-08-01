// const { pink, purple, cyan } = window.eivColors;
window.eivColors = {
  blue: "#26427e",
  pink: "#ff0088",
  purple: "#7766ff",
  cyan: "#00ffee",
};

window.sleep = (timeout) =>
  // eslint-disable-next-line no-unused-vars
  new Promise((resolve, reject) => setTimeout(resolve, timeout));

window.fetchAndInsertHTML = (url) =>
  window
    .fetch(url)
    .then((res) => res.text())
    .then((text) => document.body.insertAdjacentHTML("beforeend", text));

window.createScript = (options = {}) => {
  // TODO Support script content
  const { src, id, async = false, defer = false } = options;
  if (!id) throw new Error("Script ID is required");
  if (document.getElementById(id)) return;

  const script = document.createElement("script");

  script.id = id;
  script.src = src;
  script.async = async;
  script.defer = defer;

  document.head.appendChild(script);
  script.onload = () => {
    console.log(`Script ${id} loaded successfully`);
  };
  script.onerror = () => {
    console.error(`Script ${id} failed to load`);
  };
};

window.isHardwareAccelerated = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) return false;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return false;

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);

    // Log details
    console.log("Renderer:", renderer);
    console.log("Vendor:", vendor);

    // Basic heuristic: if software renderer is detected, hardware acceleration is likely off
    const softwareIndicators = ["software", "swiftshader", "llvmpipe"];
    return !softwareIndicators.some((word) =>
      renderer.toLowerCase().includes(word)
    );
  } catch (e) {
    return false;
  }
};
