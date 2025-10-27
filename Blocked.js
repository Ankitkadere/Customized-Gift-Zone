document.addEventListener("contextmenu", (e) => e.preventDefault());

document.onselectstart = () => false;
document.ondragstart = () => false;

document.addEventListener(
  "keydown",
  function (e) {
    const key = e.key.toUpperCase();

    // DevTools / view source combos
    if (
      key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(key)) || // Ctrl+Shift+I/J/C/K
      (e.ctrlKey && key === "U") || // Ctrl+U
      (e.metaKey && e.altKey && key === "I") // Mac combos (rough)
    ) {
      e.preventDefault();
      e.stopPropagation();

      return false;
    }

    // Disable zoom keyboard shortcuts: Ctrl/Cmd + +, -, =, 0
    if ((e.ctrlKey || e.metaKey) && ["+", "-", "=", "0"].includes(key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Disable Ctrl/Cmd + Mouse wheel usually handled in wheel listener below
  },
  { capture: true }
);

// ---------- Mouse / wheel zoom block ----------
// Prevent Ctrl/Cmd + mousewheel zoom
window.addEventListener(
  "wheel",
  function (e) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  },
  { passive: false, capture: true }
);

// ---------- Touch/pinch zoom detection & prevention ----------
// Prevent pinch-to-zoom on mobile by blocking gesturestart/pointer gestures and multi-touch scaling
function preventPinch(e) {
  if (e.touches && e.touches.length > 1) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}
document.addEventListener("touchstart", preventPinch, {
  passive: false,
  capture: true,
});
document.addEventListener("touchmove", preventPinch, {
  passive: false,
  capture: true,
});
document.addEventListener(
  "gesturestart",
  function (e) {
    e.preventDefault();
    e.stopPropagation();
  },
  { passive: false, capture: true }
);

// For pointer events (some browsers)
let activePointers = new Set();
window.addEventListener(
  "pointerdown",
  (e) => {
    activePointers.add(e.pointerId);
    if (activePointers.size > 1) {
      // multi-pointer -> likely pinch/zoom
      e.preventDefault();
      e.stopPropagation();
    }
  },
  { passive: false, capture: true }
);
window.addEventListener(
  "pointerup",
  (e) => {
    activePointers.delete(e.pointerId);
  },
  { passive: true, capture: true }
);
window.addEventListener(
  "pointercancel",
  (e) => {
    activePointers.delete(e.pointerId);
  },
  { passive: true, capture: true }
);

// ---------- DevTools detection (monitor + redirect) ----------
(function devToolsDetector() {
  const threshold = 160;
  setInterval(() => {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    if (widthDiff > threshold || heightDiff > threshold) {
      // Clear page and redirect (change to any safe URL you prefer)
      try {
        document.documentElement.innerHTML =
          "<h1 style='color:red;text-align:center;margin-top:20%'>⚠️ Developer tools are disabled on this page</h1>";
      } catch (err) {}
      try {
        window.stop();
      } catch (e) {}
      try {
        location.href = "about:blank";
      } catch (e) {}
    }
  }, 400);
})();

// Additional console-based detection trick (may cause console side effects)
(function consoleTrap() {
  const start = Date.now();
  debugger; // will pause if DevTools opens and pause-on-start is active; harmless otherwise
  const end = Date.now();
  // If debugger slowed significantly, it's likely devtools paused — redirect
  if (end - start > 100) {
    try {
      location.href = "about:blank";
    } catch (e) {}
  }
})();

// ---------- Extra: disable common mobile double-tap zoom (touchend timing) ----------
let lastTouch = 0;
document.addEventListener(
  "touchend",
  function (e) {
    const now = Date.now();
    if (now - lastTouch <= 300) {
      e.preventDefault();
      e.stopPropagation();
    }
    lastTouch = now;
  },
  { passive: false, capture: true }
);
