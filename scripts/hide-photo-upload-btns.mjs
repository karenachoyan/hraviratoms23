import fs from "fs";
import path from "path";

const files = [
  path.resolve(import.meta.dirname, "../public/invite/297/index.html"),
  path.resolve(import.meta.dirname, "../public/invite/297/allrecords.html"),
];

const hideRule = '[class*="photo-upload-btn"]{display:none!important;visibility:hidden!important;pointer-events:none!important;}';

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");

  if (html.includes('photo-upload-btn"]{display:none')) {
    console.log(`Skip ${path.basename(file)} — already hidden`);
    continue;
  }

  const marker = ".photo-file-input{display:none;}";
  if (!html.includes(marker)) {
    console.error(`Marker not found in ${path.basename(file)}`);
    process.exit(1);
  }

  html = html.replace(marker, `${marker}${hideRule}`);
  fs.writeFileSync(file, html);
  console.log(`Updated ${path.basename(file)} — hidden photo upload placeholders`);
}
