import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true, // Generate types entry file
      outDir: "build-types", // Output directory for .d.ts files
    }),
  ],
  build: {
    outDir: "build",
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'dashboard',
      fileName: (format) => `dashboard.${format}.js`,
    },
    rollupOptions: {
      external: (id) =>
        [
          "react",
          "react-dom",
          "lodash",
          "react/jsx-runtime",
          "styled-components",
          "clsx",
        ].includes(id) ||
        id.startsWith("@wpmvc") ||
        id.startsWith("@wordpress/"),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          lodash: "_",
          "react-select": "reactSelect",
          "styled-components": "styledComponents",
          "@wordpress/components": "wp.components",
          "@wordpress/i18n": "wp.i18n",
          "@wordpress/blocks": "wp.blocks",
          "@wordpress/editor": "wp.editor",
          "@wordpress/element": "wp.element",
          "@wordpress/data": "wp.data",
          "@wordpress/hooks": "wp.hooks",
          "@wordpress/compose": "wp.compose",
          "@wordpress/block-editor": "wp.blockEditor",
          "@wordpress/icons": "wp.icons",
          "@wordpress/api-fetch": "wp.apiFetch",
          "@wordpress/url": "wp.url",
          "@wordpress/viewport": "wp.viewport",
          "@wordpress/dataviews/wp": "wp.dataviewsWp",
          "@wordpress/dataviews": "wp.dataviews",
          clsx: "clsx",
          "@wpmvc/components": "wpmvc.Components",
          "@wpmvc/colors": "wpmvc.Colors",
          "@wpmvc/fields": "wpmvc.Fields",
          "@wpmvc/data": "wpmvc.Data",
          "@wpmvc/admin-sidebar": "wpmvc.AdminSidebar",
        },
      },
    },
  },
})
