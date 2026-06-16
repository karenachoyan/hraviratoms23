import fs from "fs";

const html = fs.readFileSync("public/invite/297/index.html", "utf8");
const re = /id="(rec213768[^"]+)"/g;
let m;
while ((m = re.exec(html))) {
  const id = m[1];
  const chunk = html.slice(m.index, m.index + 1500);
  const title = chunk.match(/field="title">([^<]+)/)?.[1];
  const href = chunk.match(/href="(https:\/\/maps[^"]+)"/)?.[1];
  const btn = chunk.includes("Ինչպես հասնել") ? " [BUTTON]" : "";
  console.log(`${id}${btn}${title ? ` → ${title}` : ""}${href ? `\n   ${href}` : ""}`);
}
