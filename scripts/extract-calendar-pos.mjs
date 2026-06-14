import fs from "fs";

const h = fs.readFileSync(
  "C:/Users/user/Desktop/hraviratoms/public/invite/297/index.html",
  "utf8",
);

const rec = "rec2137672493";
const idx = h.indexOf(`id="${rec}"`);
const chunk = h.slice(idx, idx + 80000);

for (const id of [
  "1775703109073",
  "1775692551083000001",
  "1775742303383000004",
]) {
  console.log(`\n=== ${id} ===`);
  const eidx = chunk.indexOf(`data-elem-id='${id}'`);
  if (eidx < 0) {
    console.log("not found");
    continue;
  }
  console.log(chunk.slice(eidx, eidx + 900));
  for (const m of h.matchAll(
    new RegExp(
      `#${rec}[^}]*data-elem-id="${id}"[^}]*\\}[^}]*\\}`,
      "g",
    ),
  )) {
    if (m[0].includes("top:")) console.log("CSS:", m[0].slice(0, 250));
  }
}
