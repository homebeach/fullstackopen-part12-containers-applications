// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Required for React components
    globals: true, // Optional, if you want to use global test variables like 'describe', 'it', etc.
    setupFiles: './setupTests.js', // Optional: for test setup (e.g., mocking, custom matchers)
  },
});
