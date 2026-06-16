import fs from "fs";
import path from "path";

const files = [
  path.resolve(import.meta.dirname, "../public/invite/297/index.html"),
  path.resolve(import.meta.dirname, "../public/invite/297/allrecords.html"),
];

const heartId = "1775703109073";
const dayId = "1775692551083000001";

const heart = {
  desktop: { top: 128, left: -63 },
  960: { top: 148, left: -63 },
  640: { top: 148, left: -63 },
  480: { top: 142, left: -80 },
  320: { top: 122, left: -36 },
};

// Center "30" on the heart (same coords, higher z-index).
const day = { ...heart };

const dayDataPattern =
  /data-elem-id='1775692551083000001' data-elem-type='text' data-field-top-value="[^"]*" data-field-left-value="[^"]*" data-field-height-value="36" data-field-width-value="76" data-field-axisy-value="center" data-field-axisx-value="center" data-field-container-value="grid" data-field-topunits-value="px" data-field-leftunits-value="px" data-field-heightunits-value="px" data-field-widthunits-value="px" data-field-textfit-value="autoheight" data-field-fontsize-value="33" data-field-top-res-320-value="[^"]*" data-field-left-res-320-value="[^"]*" data-field-height-res-320-value="25" data-field-width-res-320-value="28" data-field-fontsize-res-320-value="22" data-field-top-res-480-value="[^"]*" data-field-left-res-480-value="[^"]*" data-field-fontsize-res-480-value="30" data-field-top-res-640-value="[^"]*" data-field-left-res-640-value="[^"]*" data-field-top-res-960-value="[^"]*" data-field-left-res-960-value="[^"]*"/;

const dayDataNew =
  `data-elem-id='${dayId}' data-elem-type='text' data-field-top-value="${day.desktop.top}" data-field-left-value="${day.desktop.left}" data-field-height-value="36" data-field-width-value="76" data-field-axisy-value="center" data-field-axisx-value="center" data-field-container-value="grid" data-field-topunits-value="px" data-field-leftunits-value="px" data-field-heightunits-value="px" data-field-widthunits-value="px" data-field-textfit-value="autoheight" data-field-fontsize-value="24" data-field-top-res-320-value="${day[320].top}" data-field-left-res-320-value="${day[320].left}" data-field-height-res-320-value="25" data-field-width-res-320-value="28" data-field-fontsize-res-320-value="18" data-field-top-res-480-value="${day[480].top}" data-field-left-res-480-value="${day[480].left}" data-field-fontsize-res-480-value="22" data-field-top-res-640-value="${day[640].top}" data-field-left-res-640-value="${day[640].left}" data-field-top-res-960-value="${day[960].top}" data-field-left-res-960-value="${day[960].left}"`;

const overlayCss = `#rec2137672493 .tn-elem[data-elem-id="${dayId}"]{color:#3a3a3a;text-align:center;z-index:5;top:calc(340px - 29.5px + ${day.desktop.top}px);;left:calc(50% - 33.5px + ${day.desktop.left}px);;width:67px;height:auto;pointer-events:none;}
#rec2137672493 .tn-elem[data-elem-id="${dayId}"] .tn-atom{color:#3a3a3a;font-size:24px;line-height:1;font-weight:400;opacity:1!important;}
@media screen and (max-width:1199px){#rec2137672493 .tn-elem[data-elem-id="${dayId}"]{display:table;top:calc(340px - 29.5px + ${day[960].top}px);;left:calc(50% - 33.5px + ${day[960].left}px);;width:67px;height:auto;}}
@media screen and (max-width:959px){#rec2137672493 .tn-elem[data-elem-id="${dayId}"]{display:table;top:calc(340px - 29.5px + ${day[640].top}px);;left:calc(50% - 33.5px + ${day[640].left}px);;width:67px;height:auto;}}
@media screen and (max-width:639px){#rec2137672493 .tn-elem[data-elem-id="${dayId}"]{display:table;top:calc(340px - 29.5px + ${day[480].top}px);;left:calc(50% - 33.5px + ${day[480].left}px);;width:67px;height:auto;}}
@media screen and (max-width:639px){#rec2137672493 .tn-elem[data-elem-id="${dayId}"] .tn-atom{font-size:22px;}}
@media screen and (max-width:479px){#rec2137672493 .tn-elem[data-elem-id="${dayId}"]{display:table;top:calc(340px - 29.5px + ${day[320].top}px);;left:calc(50% - 33.5px + ${day[320].left}px);;width:52px;height:auto;}}
@media screen and (max-width:479px){#rec2137672493 .tn-elem[data-elem-id="${dayId}"] .tn-atom{font-size:18px;}}`;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");

  html = html.replace(
    `#rec2137672493 .tn-elem[data-elem-id="${dayId}"]{display:none!important;visibility:hidden!important;}`,
    "",
  );

  html = html.replace(dayDataPattern, dayDataNew);

  // Remove old day-30 positioning rules (base + media).
  html = html.replace(
    new RegExp(
      `#rec2137672493 \\.tn-elem\\[data-elem-id="${dayId}"\\]\\{color:[^}]+\\}`,
      "g",
    ),
    "",
  );
  html = html.replace(
    new RegExp(
      `#rec2137672493 \\.tn-elem\\[data-elem-id="${dayId}"\\] \\.tn-atom\\{[^}]+\\}`,
      "g",
    ),
    "",
  );
  html = html.replace(
    new RegExp(
      `@media screen and \\(max-width:(1199|959|639|479)px\\)\\{#rec2137672493 \\.tn-elem\\[data-elem-id="${dayId}"\\]\\{[^}]+\\}\\}`,
      "g",
    ),
    "",
  );
  html = html.replace(
    new RegExp(
      `@media screen and \\(max-width:(639|479)px\\)\\{#rec2137672493 \\.tn-elem\\[data-elem-id="${dayId}"\\] \\.tn-atom\\{[^}]+\\}\\}`,
      "g",
    ),
    "",
  );

  const marker = "<!-- invite297-day30-on-heart -->";
  if (html.includes(marker)) {
    html = html.replace(
      /<!-- invite297-day30-on-heart -->[\s\S]*?<!-- \/invite297-day30-on-heart -->/,
      `${marker}\n<style>${overlayCss}</style>\n<!-- /invite297-day30-on-heart -->`,
    );
  } else {
    const anchor = `<div id="rec2137672493"`;
    html = html.replace(
      anchor,
      `${marker}\n<style>${overlayCss}</style>\n<!-- /invite297-day30-on-heart -->\n${anchor}`,
    );
  }

  fs.writeFileSync(file, html);
  console.log(`Placed day 30 on heart in ${path.basename(file)}`);
}
