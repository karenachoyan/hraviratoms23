import fs from "fs";

const h = fs.readFileSync(
  "C:/Users/user/Desktop/hraviratoms/public/invite/297/index.html",
  "utf8",
);

for (const id of ["1775684291051", "1775684500777000003", "1775684414067000001"]) {
  const re = new RegExp(
    `#rec2134660133[^}]*data-elem-id="${id}"[^}]*\\}[^}]*\\}`,
    "g",
  );
  console.log("---", id);
  for (const m of h.matchAll(re)) {
    console.log(m[0]);
  }
}
