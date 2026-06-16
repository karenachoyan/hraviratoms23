const marker = 'class="t022__text t-text t-text_sm" field="text">';
const res = await fetch("http://localhost:3000/invite/297");
const html = await res.text();
const start = html.indexOf(marker);
if (start === -1) {
  console.log("NOT FOUND in served page");
  process.exit(1);
}
const contentStart = start + marker.length;
const end = html.indexOf("</div>", contentStart);
console.log("Served text block:");
console.log(html.slice(contentStart, end));
