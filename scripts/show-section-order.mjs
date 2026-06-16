import fs from "fs";

const html = fs.readFileSync("public/invite/297/index.html", "utf8");

const ids = [
  "rec2137681083",
  "rec2137681093",
  "rec2137685083",
  "rec2137681123",
  "rec2137684143",
];

for (const id of ids) {
  const p = html.indexOf(`id="${id}"`);
  const titleMatch = html.slice(p, p + 2000).match(/field="title">([^<]+)/);
  console.log(`${id}: ${titleMatch?.[1] ?? "(no title nearby)"}`);
}
