import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Two build targets:
//   npm run build         -> dist/         a normal static site, for hosting
//   npm run build:single  -> dist-single/  one self-contained index.html
//
// `base: './'` keeps asset URLs relative so both outputs work from a plain
// file:// open as well as from a web host.
export default defineConfig(({ mode }) => {
  const single = mode === 'single'

  return {
    base: './',
    // The favicon is inlined as a data URI in index.html, so the single-file
    // build has nothing to copy — keeping publicDir would emit a stray asset
    // beside the one file that is supposed to travel alone.
    publicDir: single ? false : 'public',
    plugins: [react(), tailwindcss(), ...(single ? [viteSingleFile()] : [])],
    build: {
      outDir: single ? 'dist-single' : 'dist',
      emptyOutDir: true,
      // For the single-file build every asset — including the five @fontsource
      // woff2 files — must be base64-inlined rather than emitted separately,
      // or the resulting HTML is not actually self-contained.
      assetsInlineLimit: single ? 100_000_000 : 4096,
      cssCodeSplit: !single,
    },
  }
})
