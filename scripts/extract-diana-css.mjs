import fs from "fs";

const h = fs.readFileSync(
  "C:/Users/user/Desktop/hraviratoms/public/invite/297/index.html",
  "utf8",
);

const id = "1775684291051";
const parts = h.split(id);
console.log("occurrences", parts.length - 1);

// elem tag
const elemIdx = h.indexOf(`tn-elem__21346601331775684291051`);
console.log(h.slice(elemIdx, elemIdx + 1200));

// css top rules
for (const m of h.matchAll(
  new RegExp(`#rec2134660133[^}]*${id}[^}]*top:[^;]+;`, "g"),
)) {
  console.log("CSS:", m[0].slice(0, 200));
}
