import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true, // Generate types entry file
      outDir: 'build-types',   // Output directory for .d.ts files
    }),
  ],
  build: {
    outDir: 'build',
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'AdminSidebar',
      fileName: (format) => `admin-sidebar.${format}.js`,
    },
    rollupOptions: {
      external: (id) =>
      ['react', 'react-dom', 'react-router-dom', 'lodash'].includes(id) || id.startsWith('@wordpress/'),
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          lodash: '_',
          '@wordpress/components': 'wp.components',
          '@wordpress/i18n': 'wp.i18n',
          '@wordpress/blocks': 'wp.blocks',
          '@wordpress/editor': 'wp.editor',
          '@wordpress/element': 'wp.element',
          '@wordpress/data': 'wp.data',
          '@wordpress/hooks': 'wp.hooks',
          '@wordpress/compose': 'wp.compose',
          '@wordpress/block-editor': 'wp.blockEditor',
          'react-router-dom': 'ReactRouterDOM',
        },
      },
    },
  },
});
