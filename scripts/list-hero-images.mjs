import fs from "fs";

const h = fs.readFileSync(
  "c:/Users/user/OneDrive/Desktop/hraviratoms/public/invite/297/index.html",
  "utf8",
);
const start = h.indexOf("rec2134660133");
const end = h.indexOf("rec2134660153");
const block = h.slice(start, end);
for (const m of block.matchAll(/\/invite\/297\/[a-zA-Z0-9._-]+/g)) {
  console.log(m[0]);
}
