import fs from "fs";

const h = fs.readFileSync(
  "c:/Users/user/OneDrive/Desktop/hraviratoms/public/invite/297/index.html",
  "utf8"
);

const start = h.indexOf("rec2137672493");
const css = h.slice(start, h.indexOf("</style>", start));

const calRules = [
  ...css.matchAll(
    /#rec2137672493 \.tn-elem\[data-elem-id="1775742303383000004"\]\{[^}]*width:(\d+)px[^}]*\}|#rec2137672493 \.tn-elem\[data-elem-id="1775742303383000004"\]\{[^}]*top:calc\(340px - ([\d.]+)px \+ (-?\d+)px\)[^}]*width:(\d+)px/g
  ),
];

// Parse calendar positions manually from CSS
const blocks = css.split("@media");
const desktop = blocks[0];
const calDesktop = desktop.match(
  /1775742303383000004"\]\{[^}]*top:calc\(340px - ([\d.]+)px \+ (-?\d+)px\)[^}]*left:calc\(50% - ([\d.]+)px \+ (-?\d+)px\)[^}]*width:(\d+)px/
);
console.log("Calendar desktop:", calDesktop?.slice(1));

function parseCal(mediaPrefix) {
  const re = new RegExp(
    mediaPrefix +
      "[\\s\\S]*?1775742303383000004\"\\]\\{[^}]*top:calc\\(340px - ([\\d.]+)px \\+ (-?\\d+)px\\)[^}]*(?:left:calc\\(50% - ([\\d.]+)px \\+ (-?\\d+)px\\)[^}]*?)?(?:width:(\\d+)px[^}]*?)?\\}",
  );
  const m = css.match(re);
  if (!m) return null;
  const halfH = +m[1];
  const topOff = +m[2];
  const halfW = m[3] ? +m[3] : 228;
  const leftOff = m[4] ? +m[4] : 0;
  const width = m[5] ? +m[5] : 456;
  const height = halfH * 2;
  const top = 340 + topOff - halfH;
  const leftAt1200 = 600 - halfW + leftOff; // approximate for each viewport
  return { topOff, leftOff, halfH, halfW, width, height, top, calTop: 340 + topOff - halfH };
}

// SVG day 30 center in viewBox units
const day30 = { x: 59, y: 88 };
const vb = { w: 162.71, h: 93.26 };
const abCenterY = 340;

function heartOffsets(viewportW, cal) {
  const calLeft = viewportW / 2 - cal.halfW + cal.leftOff;
  const calTop = abCenterY + cal.topOff - cal.halfH;
  const scale = cal.width / vb.w;
  const calHeight = cal.halfH * 2;
  const scaleY = calHeight / vb.h;
  const targetX = calLeft + day30.x * scale;
  const targetY = calTop + day30.y * scaleY;
  const leftOff = Math.round(targetX - viewportW / 2);
  const topOff = Math.round(targetY - abCenterY);
  return { targetX, targetY, leftOff, topOff, calLeft, calTop, scale, scaleY };
}

const breakpoints = [
  { name: "desktop", vw: 1200, cal: { topOff: 56, leftOff: 0, halfH: 130.5, halfW: 228, width: 456 } },
  { name: "960", vw: 960, cal: { topOff: 76, leftOff: 0, halfH: 130.5, halfW: 228, width: 456 } },
  { name: "640", vw: 640, cal: { topOff: 76, leftOff: 0, halfH: 130.5, halfW: 228, width: 456 } },
  { name: "480", vw: 480, cal: { topOff: 70, leftOff: 1, halfH: 130.5, halfW: 228, width: 407 } },
  { name: "320", vw: 320, cal: { topOff: 50, leftOff: 1, halfH: 130.5, halfW: 228, width: 269 } },
];

for (const bp of breakpoints) {
  console.log(bp.name, heartOffsets(bp.vw, bp.cal));
}
