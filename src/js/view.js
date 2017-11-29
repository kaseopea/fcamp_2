class Renderer {
  // Show element
  showElement(element) {
    return element ? (element.style.display = "block") : null;
  }

  // Hide element
  hideElement(element) {
    return element ? (element.style.display = "none") : null;
  }

  // Render content to specific element
  setView(element, content) {
    return element ? (element.innerHTML = content) : null;
  }

  // Reset content of specific element
  resetView(element) {
    return element ? (element.innerHTML = "") : null;
  }

  // Check if element is hidden
  isHidden(element) {
    return window.getComputedStyle(element).display === "none";
  }

  // check if view is mobile
  isMobileView() {
    return (
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <=
      MOBILE_BREAKPOINT
    );
  }
}
const VIEW = (() => ({
  Renderer
}))();
