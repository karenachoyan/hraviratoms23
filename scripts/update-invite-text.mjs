import fs from "fs";

const newText =
  '<p style="text-align: center;">Սիրով հրավիրում ենք ձեզ ներկա գտնվելու մեր հարսանիքին և կիսելու այդ գեղեցիկ և հիշարժան օրը մեզ հետ։</p>';

for (const file of ["public/invite/297/index.html", "public/invite/297/allrecords.html"]) {
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(
    /(<div class="t022__text t-text t-text_sm" field="text">)[\s\S]*?(<\/div> <\/div> <\/div> <\/div> <\/div> <style> #rec2134660213)/,
    `$1${newText}$2`,
  );
  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
}
