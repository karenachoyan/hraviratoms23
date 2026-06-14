import fs from "fs";

const h = fs.readFileSync(
  "C:/Users/user/Desktop/hraviratoms/public/invite/297/index.html",
  "utf8",
);

for (const [label, id] of [
  ["Diana", "1775684291051"],
  ["Armen", "1775684500777000003"],
]) {
  const idx = h.indexOf(`data-elem-id='${id}'`);
  const block = h.slice(idx, idx + 2000);
  console.log(`\n${label}:`);
  for (const m of block.matchAll(/data-field-top[^=]*="([^"]+)"/g)) {
    console.log(" ", m[0]);
  }
}
