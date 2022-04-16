require('esbuild').build({
    entryPoints: ['./index.js'],
    bundle: true,
    outfile: 'index.built.js',
    format:"iife",
    minify:false
  }).catch(() => process.exit(1))