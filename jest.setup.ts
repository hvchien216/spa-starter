import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

class ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {
    // You can add any setup you need here
  }

  observe(_target: Element) {
    // You can simulate observing a target element
  }

  unobserve(_target: Element) {
    // Logic for unobserving a target
  }

  disconnect() {
    // Logic for disconnecting
  }
}

global.ResizeObserver = ResizeObserver as any; // Cast to any to avoid TypeScript errors
