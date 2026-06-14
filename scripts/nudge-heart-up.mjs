import fs from "fs";
import path from "path";

const files = [
  path.resolve(import.meta.dirname, "../public/invite/297/index.html"),
  path.resolve(import.meta.dirname, "../public/invite/297/allrecords.html"),
];

const prev = { desktop: 138, 960: 158, 480: 152, 320: 132 };
const next = { desktop: 128, 960: 148, 480: 142, 320: 122 };

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(
    'data-field-top-value="138"',
    'data-field-top-value="128"',
  );
  html = html.replace(
    'data-field-top-res-960-value="158"',
    'data-field-top-res-960-value="148"',
  );
  html = html.replace(
    'data-field-top-res-320-value="132"',
    'data-field-top-res-320-value="122"',
  );
  for (const key of Object.keys(prev)) {
    html = html.replaceAll(
      `top:calc(340px - 29.5px + ${prev[key]}px)`,
      `top:calc(340px - 29.5px + ${next[key]}px)`,
    );
  }
  fs.writeFileSync(file, html);
  console.log(`Nudged heart up 10px in ${path.basename(file)}`);
}
