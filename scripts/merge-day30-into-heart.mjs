import fs from "fs";
import path from "path";

const files = [
  path.resolve(import.meta.dirname, "../public/invite/297/index.html"),
  path.resolve(import.meta.dirname, "../public/invite/297/allrecords.html"),
];

const heartImgMarker = "imgfield='tn_img_1775703109073'";

const overlayCss = `<!-- invite297-day30-on-heart -->
<style>
#rec2137672493 .tn-elem[data-elem-id="1775703109073"] .tn-atom{position:relative;display:block;width:100%;line-height:0;}
#rec2137672493 .tn-elem[data-elem-id="1775703109073"] .tn-atom__img{display:block;width:100%;height:auto;}
#rec2137672493 .invite-heart-day{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);margin:0;padding:0;color:#3a3a3a;font-family:'English',Arial,sans-serif;font-size:22px;font-weight:400;line-height:1;letter-spacing:0;pointer-events:none;z-index:2;}
@media screen and (max-width:639px){#rec2137672493 .invite-heart-day{font-size:20px;}}
@media screen and (max-width:479px){#rec2137672493 .invite-heart-day{font-size:16px;top:54%;}}
</style>
<!-- /invite297-day30-on-heart -->`;

const separateDayBlock =
  /<div class='t396__elem tn-elem tn-elem__21376724931775692551083000001'[\s\S]*?data-elem-id='1775692551083000001'[\s\S]*?<div class='tn-atom'field='tn_text_1775692551083000001'>30<\/div> <\/div> /g;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");

  if (!html.includes(heartImgMarker)) {
    console.error(`Heart image not found in ${path.basename(file)}`);
    process.exit(1);
  }

  html = html.replace(separateDayBlock, "");

  if (!html.includes('class="invite-heart-day"')) {
    html = html.replace(
      /<div class='tn-atom'> <img class='tn-atom__img t-img' data-original='\/invite\/297\/floral-branch\.png'/,
      "<div class='tn-atom invite-heart-day-wrap'> <img class='tn-atom__img t-img' data-original='/invite/297/floral-branch.png'",
    );

    html = html.replace(
      `${heartImgMarker}\n/> </div> </div>`,
      `${heartImgMarker}\n/> <span class="invite-heart-day">30</span> </div> </div>`,
    );
  } else if (!html.includes("invite-heart-day-wrap")) {
    html = html.replace(
      /<div class='tn-atom'> <img class='tn-atom__img t-img'[^>]+imgfield='tn_img_1775703109073'/,
      (match) => match.replace("<div class='tn-atom'>", "<div class='tn-atom invite-heart-day-wrap'>"),
    );
  }

  if (html.includes("<!-- invite297-day30-on-heart -->")) {
    html = html.replace(
      /<!-- invite297-day30-on-heart -->[\s\S]*?<!-- \/invite297-day30-on-heart -->/,
      overlayCss,
    );
  } else {
    html = html.replace(
      '<div id="rec2137672493"',
      `${overlayCss}\n<div id="rec2137672493"`,
    );
  }

  html = html.replace(
    /#rec2137672493 \.tn-elem\[data-elem-id="1775692551083000001"\]\{display:none!important;visibility:hidden!important;\}/g,
    "",
  );

  fs.writeFileSync(file, html);
  console.log(`Merged day 30 into heart atom in ${path.basename(file)}`);
}
