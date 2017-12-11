import { APP_CONST } from './const/general';

export class ViewRenderer {

  // Show element
  static showElement(element) {
    if (element) {
      element.style.display = 'block';
    }
  }

  // Hide element
  static hideElement(element) {
    if (element) {
      element.style.display = 'none';
    }
  }

  // Render content to specific element
  static setView(element, content) {
    if (element) {
      element.innerHTML = content;
    }
  }

  // Reset content of specific element
  static resetView(element) {
    if (element) {
      element.innerHTML = '';
    }
  }

  // Add class
  static addClass(element, className) {
    return element.classList.add(className);
  }

  // Remove class
  static removeClass(element, className) {
    return element.classList.remove(className);
  }

  // Check if element is hidden
  static isHidden(element) {
    return window.getComputedStyle(element).display === 'none';
  }

  // check if view is mobile
  static isMobileView() {
    const viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return viewportW <= APP_CONST.mobileBreakpoint;
  }
}
