import fs from "fs";
import path from "path";

const files = [
  path.resolve(import.meta.dirname, "../public/invite/297/index.html"),
  path.resolve(import.meta.dirname, "../public/invite/297/allrecords.html"),
];

const marker = "invite-light-footer-v1";

const hideCss = `[class*="photo-upload-btn"]{display:none!important;visibility:hidden!important;pointer-events:none!important;}`;

const footerCss = `
#rec2134660523,#rec2134660533,#rec1499996911,#rec1681614861,#rec1817043671,#rec1817047001,.t898{display:none!important;visibility:hidden!important;pointer-events:none!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;}
.invite-light-footer{background:linear-gradient(180deg,rgba(247,244,239,0) 0%,#f7f4ef 35%,#f3f0ea 100%);padding:52px 20px 44px;text-align:center;}
.invite-light-footer__names{margin:0 0 8px;font-family:'Heghnar','Noto Serif Armenian',Georgia,serif;font-size:24px;font-weight:400;color:#2a2724;letter-spacing:.04em;line-height:1.2;}
.invite-light-footer__date{margin:0;font-family:'MontserratARM',Arial,sans-serif;font-size:11px;font-weight:300;color:#9a9590;letter-spacing:.22em;text-transform:uppercase;}
@media screen and (max-width:480px){.invite-light-footer{padding:40px 16px 36px;}.invite-light-footer__names{font-size:20px;}}
`.replace(/\n/g, "");

const footerHtml = `<div id="invite-light-footer" class="invite-light-footer" data-invite="${marker}"><div class="invite-light-footer__inner"><p class="invite-light-footer__names">Արմեն &amp; Դիանա</p><p class="invite-light-footer__date">01 · 08 · 2026</p></div></div>`;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");

  if (html.includes(`data-invite="${marker}"`)) {
    console.log(`Skip ${path.basename(file)} — already updated`);
    continue;
  }

  if (!html.includes(hideCss)) {
    console.error(`Photo-upload CSS marker missing in ${path.basename(file)}`);
    process.exit(1);
  }

  html = html.replace(hideCss, hideCss + footerCss);

  if (html.includes("</footer> <!--/footer-->")) {
    html = html.replace(
      "</footer> <!--/footer-->",
      `${footerHtml}</footer> <!--/footer-->`,
    );
  } else {
    console.error(`Footer marker missing in ${path.basename(file)}`);
    process.exit(1);
  }

  fs.writeFileSync(file, html);
  console.log(`Updated ${path.basename(file)} — light footer applied`);
}
