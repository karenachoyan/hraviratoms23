import fs from "fs";

const h = fs.readFileSync("public/invite/297/index.html", "utf8");

for (const id of ["2137681093", "2137684143", "2137681073", "2137681083", "2137683693"]) {
  const idx = h.indexOf(`rec${id}`);
  if (idx === -1) continue;
  const chunk = h.slice(idx, idx + 2500);
  const maps = chunk.match(/href="https:\/\/www\.google\.com\/maps[^"]+"/g);
  const texts = chunk.match(/field="[^"]+">[^<]+</g);
  console.log("\n=== rec" + id + " ===");
  console.log("maps:", maps);
  console.log("texts:", texts?.slice(0, 15));
}
