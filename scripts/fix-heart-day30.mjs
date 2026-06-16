import fs from "fs";
import path from "path";

const files = [
  path.resolve(import.meta.dirname, "../public/invite/297/index.html"),
  path.resolve(import.meta.dirname, "../public/invite/297/allrecords.html"),
];

const rec = "rec2137672493";
const heartId = "1775703109073";
const dayId = "1775692551083000001";

// Derived from september-calendar.svg day-30 cell center (x=59, y=88 in viewBox)
const heart = {
  desktop: { top: 128, left: -63 },
  960: { top: 148, left: -63 },
  640: { top: 148, left: -63 },
  480: { top: 142, left: -80 },
  320: { top: 122, left: -36 },
};

const brokenHide =
  '[class*="photo-upload-btn"]{display:none!important;#rec2137672493 .tn-elem[data-elem-id="1775692551083000001"]{display:none!important;visibility:hidden!important;}visibility:hidden!important;pointer-events:none!important;}';

const fixedHide =
  '[class*="photo-upload-btn"]{display:none!important;visibility:hidden!important;pointer-events:none!important;}';

const dataReplacements = [
  [
    `data-elem-id='${heartId}' data-elem-type='image' data-field-top-value="131" data-field-left-value="-37"`,
    `data-elem-id='${heartId}' data-elem-type='image' data-field-top-value="${heart.desktop.top}" data-field-left-value="${heart.desktop.left}"`,
  ],
  [
    `data-field-top-res-960-value="151" data-field-left-res-960-value="42"`,
    `data-field-top-res-960-value="${heart[960].top}" data-field-left-res-960-value="${heart[960].left}"`,
  ],
  [
    `data-field-top-res-320-value="41" data-field-left-res-320-value="12"`,
    `data-field-top-res-320-value="${heart[320].top}" data-field-left-res-320-value="${heart[320].left}"`,
  ],
  // legacy values from older patches
  [
    `data-field-top-res-960-value="110" data-field-left-res-960-value="-69"`,
    `data-field-top-res-960-value="${heart[960].top}" data-field-left-res-960-value="${heart[960].left}"`,
  ],
  [
    `data-field-top-res-320-value="105" data-field-left-res-320-value="-125"`,
    `data-field-top-res-320-value="${heart[320].top}" data-field-left-res-320-value="${heart[320].left}"`,
  ],
];

const cssReplacements = [
  ["top:calc(340px - 29.5px + 131px)", `top:calc(340px - 29.5px + ${heart.desktop.top}px)`],
  ["left:calc(50% - 33.5px + -37px)", `left:calc(50% - 33.5px + ${heart.desktop.left}px)`],
  ["top:calc(340px - 29.5px + 151px)", `top:calc(340px - 29.5px + ${heart[960].top}px)`],
  ["left:calc(50% - 33.5px + 42px)", `left:calc(50% - 33.5px + ${heart[960].left}px)`],
  ["left:calc(50% - 33.5px + 40px)", `left:calc(50% - 33.5px + ${heart[640].left}px)`],
  ["top:calc(340px - 29.5px + 41px)", `top:calc(340px - 29.5px + ${heart[320].top}px)`],
  ["left:calc(50% - 33.5px + 12px)", `left:calc(50% - 33.5px + ${heart[320].left}px)`],
  // older offsets
  ["top:calc(340px - 29.5px + 88px)", `top:calc(340px - 29.5px + ${heart.desktop.top}px)`],
  ["left:calc(50% - 33.5px + -70px)", `left:calc(50% - 33.5px + ${heart.desktop.left}px)`],
  ["top:calc(340px - 29.5px + 110px)", `top:calc(340px - 29.5px + ${heart[960].top}px)`],
  ["left:calc(50% - 33.5px + -69px)", `left:calc(50% - 33.5px + ${heart[960].left}px)`],
  ["top:calc(340px - 29.5px + 105px)", `top:calc(340px - 29.5px + ${heart[320].top}px)`],
  ["left:calc(50% - 33.5px + -125px)", `left:calc(50% - 33.5px + ${heart[320].left}px)`],
];

const heart640Old =
  `#rec2137672493 .tn-elem[data-elem-id="${heartId}"]{display:table;top:calc(340px - 29.5px + 151px);;left:calc(50% - 33.5px + 40px);;height:auto;}`;
const heart640New =
  `#rec2137672493 .tn-elem[data-elem-id="${heartId}"]{display:table;top:calc(340px - 29.5px + ${heart[640].top}px);;left:calc(50% - 33.5px + ${heart[640].left}px);;height:auto;}`;

const heart480Old =
  `@media screen and (max-width:639px){#rec2137672493 .tn-elem[data-elem-id="${heartId}"]{display:table;top:calc(340px - 29.5px + 151px);;left:calc(50% - 33.5px + 40px);;height:auto;}}`;
const heart480New =
  `@media screen and (max-width:639px){#rec2137672493 .tn-elem[data-elem-id="${heartId}"]{display:table;top:calc(340px - 29.5px + ${heart[480].top}px);;left:calc(50% - 33.5px + ${heart[480].left}px);;height:auto;}}`;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");

  if (html.includes(brokenHide)) {
    html = html.replace(brokenHide, fixedHide);
  }

  for (const [from, to] of dataReplacements) {
    if (html.includes(from)) html = html.split(from).join(to);
  }

  for (const [from, to] of cssReplacements) {
    html = html.split(from).join(to);
  }

  if (html.includes(heart640Old)) html = html.replace(heart640Old, heart640New);
  if (html.includes(heart480Old)) html = html.replace(heart480Old, heart480New);

  // 1199px media block — ensure 960 values
  html = html.replace(
    `@media screen and (max-width:1199px){#rec2137672493 .tn-elem[data-elem-id="${heartId}"]{display:table;top:calc(340px - 29.5px + ${heart[640].top}px);;left:calc(50% - 33.5px + ${heart[640].left}px);;height:auto;}`,
    `@media screen and (max-width:1199px){#rec2137672493 .tn-elem[data-elem-id="${heartId}"]{display:table;top:calc(340px - 29.5px + ${heart[960].top}px);;left:calc(50% - 33.5px + ${heart[960].left}px);;height:auto;}`,
  );

  fs.writeFileSync(file, html);
  console.log(`Aligned heart to Sep 30 in ${path.basename(file)}`);
}
