import '@testing-library/jest-dom/vitest';

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {}

  disconnect() {}
}

globalThis.IntersectionObserver = MockIntersectionObserver;
