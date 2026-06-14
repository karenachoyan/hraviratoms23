import fs from "fs";
import path from "path";

const files = [
  path.resolve(import.meta.dirname, "../public/invite/297/index.html"),
  path.resolve(import.meta.dirname, "../public/invite/297/allrecords.html"),
];

const rec = "rec2137672493";
const heartId = "1775703109073";
const dayId = "1775692551083000001";

const dayDataFrom12 = [
  [
    'data-elem-id=\'1775692551083000001\' data-elem-type=\'text\' data-field-top-value="321" data-field-left-value="698"',
    'data-elem-id=\'1775692551083000001\' data-elem-type=\'text\' data-field-top-value="411" data-field-left-value="492"',
  ],
  [
    'data-field-top-res-320-value="231" data-field-left-res-320-value="228"',
    'data-field-top-res-320-value="321" data-field-left-res-320-value="100"',
  ],
  [
    'data-field-top-res-480-value="293" data-field-left-res-480-value="337"',
    'data-field-top-res-480-value="431" data-field-left-res-480-value="209"',
  ],
  [
    'data-field-top-res-640-value="341" data-field-left-res-640-value="417"',
    'data-field-top-res-640-value="431" data-field-left-res-640-value="289"',
  ],
  [
    'data-field-top-res-960-value="341" data-field-left-res-960-value="579"',
    'data-field-top-res-960-value="431" data-field-left-res-960-value="451"',
  ],
  // index.html partial-update leftovers
  [
    'data-field-top-res-480-value="373" data-field-left-res-480-value="209"',
    'data-field-top-res-480-value="431" data-field-left-res-480-value="209"',
  ],
  [
    'data-field-top-res-320-value="301" data-field-left-res-320-value="100"',
    'data-field-top-res-320-value="321" data-field-left-res-320-value="100"',
  ],
];

const heartDataFrom12 = [
  [
    'data-elem-id=\'1775703109073\' data-elem-type=\'image\' data-field-top-value="-2" data-field-left-value="136"',
    'data-elem-id=\'1775703109073\' data-elem-type=\'image\' data-field-top-value="88" data-field-left-value="-70"',
  ],
  [
    'data-field-top-res-320-value="15" data-field-left-res-320-value="81"',
    'data-field-top-res-320-value="105" data-field-left-res-320-value="-125"',
  ],
  [
    'data-field-top-res-960-value="20" data-field-left-res-960-value="137"',
    'data-field-top-res-960-value="110" data-field-left-res-960-value="-69"',
  ],
];

const dayCssReplacements = [
  ["top:321px;;left:calc(50% - 600px + 698px)", "top:411px;;left:calc(50% - 600px + 492px)"],
  ["top:321px;;left:calc(50% - 600px + 492px)", "top:411px;;left:calc(50% - 600px + 492px)"],
  ["left:calc(50% - 600px + 698px)", "left:calc(50% - 600px + 492px)"],
  ["top:341px;;left:calc(50% - 480px + 579px)", "top:431px;;left:calc(50% - 480px + 451px)"],
  ["top:341px;;left:calc(50% - 480px + 417px)", "top:431px;;left:calc(50% - 480px + 451px)"],
  ["top:431px;;left:calc(50% - 480px + 417px)", "top:431px;;left:calc(50% - 480px + 451px)"],
  ["top:341px;;left:calc(50% - 320px + 417px)", "top:431px;;left:calc(50% - 320px + 289px)"],
  ["top:431px;;left:calc(50% - 320px + 417px)", "top:431px;;left:calc(50% - 320px + 289px)"],
  ["left:calc(50% - 240px + 337px)", "left:calc(50% - 240px + 209px)"],
  ["top:293px;;left:calc(50% - 240px + 337px)", "top:431px;;left:calc(50% - 240px + 209px)"],
  ["top:293px;;left:calc(50% - 240px + 289px)", "top:431px;;left:calc(50% - 240px + 209px)"],
  ["top:431px;;left:calc(50% - 240px + 289px)", "top:431px;;left:calc(50% - 240px + 209px)"],
  ["top:231px;;left:calc(50% - 160px + 228px)", "top:321px;;left:calc(50% - 160px + 100px)"],
  ["top:301px;;left:calc(50% - 160px + 100px)", "top:321px;;left:calc(50% - 160px + 100px)"],
  ["top:373px;;left:calc(50% - 240px + 209px)", "top:431px;;left:calc(50% - 240px + 209px)"],
  ["top:293px;;left:calc(50% - 240px + 209px)", "top:431px;;left:calc(50% - 240px + 209px)"],
];

const heartCssReplacements = [
  ["left:calc(50% - 33.5px + 136px)", "left:calc(50% - 33.5px + -70px)"],
  ["top:calc(340px - 29.5px + -2px)", "top:calc(340px - 29.5px + 88px)"],
  ["left:calc(50% - 33.5px + 137px)", "left:calc(50% - 33.5px + -69px)"],
  ["top:calc(340px - 29.5px + 20px)", "top:calc(340px - 29.5px + 110px)"],
  ["left:calc(50% - 33.5px + 81px)", "left:calc(50% - 33.5px + -125px)"],
  ["top:calc(340px - 29.5px + 15px)", "top:calc(340px - 29.5px + 105px)"],
  ["top:calc(340px - 29.5px + 108px)", "top:calc(340px - 29.5px + 110px)"],
  ["top:calc(340px - 29.5px + 103px)", "top:calc(340px - 29.5px + 105px)"],
];

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceInElemRules(html, id, from, to) {
  const re = new RegExp(
    `(#${rec}[^}]*data-elem-id="${id}"[^}]*\\{[^}]*?)${escapeRe(from)}`,
    "g",
  );
  return html.replace(re, `$1${to}`);
}

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");

  html = html
    .split("tn_text_1775692551083000001'>12<")
    .join("tn_text_1775692551083000001'>30<");

  for (const [from, to] of dayDataFrom12) {
    html = html.split(from).join(to);
  }
  for (const [from, to] of heartDataFrom12) {
    html = html.split(from).join(to);
  }

  for (const [from, to] of dayCssReplacements) {
    html = replaceInElemRules(html, dayId, from, to);
  }
  for (const [from, to] of heartCssReplacements) {
    html = replaceInElemRules(html, heartId, from, to);
  }

  html = html.replace(
    new RegExp(
      `(#${rec} \\.tn-elem\\[data-elem-id="${dayId}"\\]\\{color:#ffffff[^}]*top:)321px`,
      "g",
    ),
    "$1411px",
  );

  fs.writeFileSync(file, html);
  console.log(`Fixed calendar in ${path.basename(file)}`);
  console.log(
    "  day30 text:",
    html.includes("tn_text_1775692551083000001'>30<"),
  );
  console.log("  heart -70:", html.includes('data-field-left-value="-70"'));
  console.log("  no day12 left 698:", !html.includes("+ 698px"));
}
