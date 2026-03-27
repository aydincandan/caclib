npx esbuild ./caclib.js --outfile=./npm_publish_slot/index.js   // YALNIZCA AÇIKLAMALAR YOK OLUYOR  DAHA İYİ 
npx terser ./caclib.js -o ./npm_publish_slot/indexY.js   // AÇIKLAMALAR YOK OLUYOR TEK SATIR
npx esbuild ./caclib.js --minify-whitespace --outfile=./npm_publish_slot/indexZ.js   // AÇIKLAMALAR YOK OLUYOR TEK SATIR
