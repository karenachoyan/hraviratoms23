import fs from "fs";

const h = fs.readFileSync(
  "c:/Users/user/OneDrive/Desktop/hraviratoms/public/invite/297/index.html",
  "utf8",
);

for (const id of ["1779400262461", "1775648406026"]) {
  console.log(`\n=== ${id} ===`);
  for (const m of h.matchAll(
    new RegExp(
      `#rec2134660133[^}]*data-elem-id="${id}"[^}]*\\{[^}]+\\}`,
      "g",
    ),
  )) {
    console.log(m[0].slice(0, 300));
  }
}

const idx = h.indexOf("couple-photo");
console.log("\ncouple-photo context:", h.slice(idx - 80, idx + 120));
