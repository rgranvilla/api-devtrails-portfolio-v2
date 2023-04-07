import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      'vitest-environment-prisma': 'prisma/vitest-environment-prisma',
    },
  },
  test: {
    environmentMatchGlobs: [['src/application/controllers/**', 'prisma']],
  },
});
