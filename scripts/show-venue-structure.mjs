import fs from "fs";

const html = fs.readFileSync("public/invite/297/index.html", "utf8");
const ids = [
  "rec2137684563",
  "rec2137683693",
  "rec2137681073",
  "rec2137681083",
  "rec2137681093",
  "rec2137685083",
  "rec2137681103",
  "rec2137681113",
  "rec2137681123",
  "rec2137684143",
];

for (const id of ids) {
  const p = html.indexOf(`id="${id}"`);
  const chunk = html.slice(p, p + 800);
  const type = chunk.match(/data-record-type="(\d+)"/)?.[1];
  const title = chunk.match(/field="title">([^<]+)/)?.[1];
  const descr = chunk.match(/field="descr">([^<]+)/)?.[1];
  const href = chunk.match(/href="(https:\/\/maps[^"]+)"/)?.[1];
  const img = chunk.match(/data-original="([^"]+)"/)?.[1];
  console.log(
    [
      id,
      type ? `type=${type}` : "",
      title ? `title=${title}` : "",
      descr ? `time=${descr}` : "",
      img ? `img=${img.split("/").pop()}` : "",
      href ? `maps=${href}` : "",
    ]
      .filter(Boolean)
      .join(" | "),
  );
}
