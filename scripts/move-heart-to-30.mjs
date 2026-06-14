import fs from "fs";

const path = "C:/Users/user/Desktop/hraviratoms/public/invite/297/index.html";
let h = fs.readFileSync(path, "utf8");

const rec = "rec2137672493";
const heartId = "1775703109073";
const dayId = "1775692551083000001";

// Desktop: day 12 -> day 30 (from prior analysis)
const dayCssReplacements = [
  ["left:calc(50% - 600px + 698px)", "left:calc(50% - 600px + 492px)"],
  ["top:321px;;left:calc(50% - 600px + 492px)", "top:411px;;left:calc(50% - 600px + 492px)"],
  // 1199px breakpoint had 579 - day 12 col6 -> day30 col3 approx
  ["left:calc(50% - 480px + 579px)", "left:calc(50% - 480px + 417px)"],
  ["top:341px;;left:calc(50% - 480px + 417px)", "top:431px;;left:calc(50% - 480px + 417px)"],
  // already 417 at 320 - update top 341->431
  ["top:341px;;left:calc(50% - 320px + 417px)", "top:431px;;left:calc(50% - 320px + 417px)"],
  // 480: 337 -> 289 area, top 293->431
  ["left:calc(50% - 240px + 337px)", "left:calc(50% - 240px + 289px)"],
  ["top:293px;;left:calc(50% - 240px + 289px)", "top:431px;;left:calc(50% - 240px + 289px)"],
  // 320 mobile: 228 -> 100 already in data-field, top 231->301
  ["top:231px;;left:calc(50% - 160px + 228px)", "top:301px;;left:calc(50% - 160px + 100px)"],
];

const heartCssReplacements = [
  ["left:calc(50% - 33.5px + 136px)", "left:calc(50% - 33.5px + -70px)"],
  ["top:calc(340px - 29.5px + -2px)", "top:calc(340px - 29.5px + 88px)"],
  ["left:calc(50% - 33.5px + 137px)", "left:calc(50% - 33.5px + -69px)"],
  ["top:calc(340px - 29.5px + 20px)", "top:calc(340px - 29.5px + 108px)"],
  ["left:calc(50% - 33.5px + 81px)", "left:calc(50% - 33.5px + -125px)"],
  ["top:calc(340px - 29.5px + 15px)", "top:calc(340px - 29.5px + 103px)"],
];

// Only replace within rules for specific elem ids - safer with context
function replaceInElemRules(id, from, to) {
  const re = new RegExp(
    `(#${rec}[^}]*data-elem-id="${id}"[^}]*\\{[^}]*?)${escapeRe(from)}`,
    "g",
  );
  const before = h;
  h = h.replace(re, `$1${to}`);
  return (before.match(re) || []).length;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

for (const [from, to] of dayCssReplacements) {
  const n = replaceInElemRules(dayId, from, to);
  if (n) console.log(`day ${from} -> ${to}: ${n}`);
}

for (const [from, to] of heartCssReplacements) {
  const n = replaceInElemRules(heartId, from, to);
  if (n) console.log(`heart ${from} -> ${to}: ${n}`);
}

// Also fix day rule that still has top 321 without going through combined string
h = h.replace(
  new RegExp(
    `(#${rec} \\.tn-elem\\[data-elem-id="${dayId}"\\]\\{color:#ffffff[^}]*top:)321px`,
    "g",
  ),
  "$1411px",
);

// Hide "12" in SVG if still visible - check september-calendar.svg for heart baked in
// The SVG has path digits - heart might only be the overlay image

fs.writeFileSync(path, h);
console.log("Done. Remaining 698:", h.includes("698px"));
console.log("Remaining + 136px:", h.includes("+ 136px"));
console.log("Has 492px day:", h.includes("492px"));
console.log("Has heart -70:", h.includes("+ -70px"));
