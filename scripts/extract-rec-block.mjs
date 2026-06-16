import fs from "fs";

const html = fs.readFileSync("public/invite/297/index.html", "utf8");
for (const id of ["rec2134660213", "rec2140427433"]) {
  const p = html.indexOf(`id="${id}"`);
  console.log(`\n=== ${id} at ${p} ===`);
  if (p > -1) {
    console.log(html.slice(p, p + 3000));
  }
}
