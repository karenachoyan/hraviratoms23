import fs from "fs";
import path from "path";

const files = [
  path.resolve(import.meta.dirname, "../public/invite/297/index.html"),
  path.resolve(import.meta.dirname, "../public/invite/297/allrecords.html"),
];

const rec = "rec2134660133";
const dianaId = "1775684291051";

// Current (after +60px move) -> final (+90px from original)
const dataFieldMoves = [
  ['data-elem-id=\'1775684291051\' data-elem-type=\'text\' data-field-top-value="390"', 'data-elem-id=\'1775684291051\' data-elem-type=\'text\' data-field-top-value="360"'],
  ['data-field-top-res-320-value="410" data-field-left-res-320-value="91"', 'data-field-top-res-320-value="380" data-field-left-res-320-value="91"'],
  ['data-field-top-res-480-value="419" data-field-left-res-480-value="187"', 'data-field-top-res-480-value="389" data-field-left-res-480-value="187"'],
  ['data-field-top-res-640-value="400" data-field-left-res-640-value="255"', 'data-field-top-res-640-value="370" data-field-left-res-640-value="255"'],
  ['data-field-top-res-960-value="371" data-field-left-res-960-value="441"', 'data-field-top-res-960-value="341" data-field-left-res-960-value="441"'],
];

const cssMoves = [
  ["top:calc(50vh - 275px + 390px)", "top:calc(50vh - 275px + 360px)"],
  ["top:371px;;left:calc(50% - 480px + 441px)", "top:341px;;left:calc(50% - 480px + 441px)"],
  ["top:400px;;left:calc(50% - 320px + 255px)", "top:370px;;left:calc(50% - 320px + 255px)"],
  ["top:419px;;left:calc(50% - 240px + 187px)", "top:389px;;left:calc(50% - 240px + 187px)"],
  ["top:410px;;left:calc(50% - 160px + 91px)", "top:380px;;left:calc(50% - 160px + 91px)"],
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

  for (const [from, to] of dataFieldMoves) {
    html = html.split(from).join(to);
  }

  for (const [from, to] of cssMoves) {
    html = replaceInElemRules(html, dianaId, from, to);
  }

  fs.writeFileSync(file, html);
  console.log(`Updated ${path.basename(file)} (Diana +90px from original)`);
}
