import fs from "fs";

const file = "public/invite/297/index.html";
const html = fs.readFileSync(file, "utf8");

for (const id of ["rec2137681093", "rec2137684143", "rec2137685083"]) {
  const p = html.indexOf(`id="${id}"`);
  console.log(`\n=== ${id} ===`);
  if (p > -1) {
    const chunk = html.slice(Math.max(0, p - 200), p + 1200);
    const hrefMatch = chunk.match(/href="([^"]+)"/);
    console.log("href:", hrefMatch?.[1] ?? "none");
    console.log(chunk.slice(0, 800));
  }
}
