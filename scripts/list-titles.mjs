import fs from "fs";

const html = fs.readFileSync("public/invite/297/index.html", "utf8");
const re = /field="title">([^<]+)/g;
let m;
let i = 0;
while ((m = re.exec(html))) {
  i++;
  console.log(i, m[1]);
}
