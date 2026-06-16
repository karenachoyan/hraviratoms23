import fs from "fs";

for (const file of ["public/invite/297/index.html", "public/invite/297/allrecords.html"]) {
  const html = fs.readFileSync(file, "utf8");
  const marker = 'class="t022__text t-text t-text_sm" field="text">';
  const start = html.indexOf(marker);
  if (start === -1) {
    console.log(`${file}: NOT FOUND`);
    continue;
  }
  const contentStart = start + marker.length;
  const end = html.indexOf("</div>", contentStart);
  console.log(`\n=== ${file} ===`);
  console.log(html.slice(contentStart, end));
}
