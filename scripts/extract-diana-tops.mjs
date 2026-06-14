import fs from "fs";

const h = fs.readFileSync(
  "C:/Users/user/Desktop/hraviratoms/public/invite/297/index.html",
  "utf8",
);

const id = "1775684291051";
for (const m of h.matchAll(
  new RegExp(
    `#rec2134660133 \\.tn-elem\\[data-elem-id="${id}"\\][^{]*\\{[^}]+\\}`,
    "g",
  ),
)) {
  console.log(m[0]);
  console.log("---");
}
