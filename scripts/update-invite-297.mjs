import fs from "fs";
import path from "path";

const htmlPath = path.resolve(
  import.meta.dirname,
  "../public/invite/297/index.html",
);
let html = fs.readFileSync(htmlPath, "utf8");

const replacements = [
  ["Tigran", "Արմեն"],
  ["Liliana", "Դիանա"],
  ["tn_text_1775692551083000001'>12<", "tn_text_1775692551083000001'>30<"],
  ["2026-09-12 00:00", "2026-09-30 00:00"],
  ["Սուրբ Մարիամ Աստվածածին եկեղեցի", "Սուրբ Գայանե եկեղեցի"],
  ["ք․ Երևան, Արմենակյան 225", "Էջմիածին"],
  ["Afina Hall by Palladium", "Ռոստելան հրաշք այգի"],
  ["Ջրվեժ, Թևոսյան 117/5", ""],
  ["01․09․2026", "01․08․2026"],
];

// Move highlighted date (30) and gold heart on the calendar grid
const calendarMoves = [
  ['data-elem-id="1775692551083000001" data-elem-type="text" data-field-top-value="321" data-field-left-value="698"', 'data-elem-id="1775692551083000001" data-elem-type="text" data-field-top-value="411" data-field-left-value="492"'],
  ['data-field-top-res-320-value="231" data-field-left-res-320-value="228"', 'data-field-top-res-320-value="301" data-field-left-res-320-value="100"'],
  ['data-field-top-res-480-value="293" data-field-left-res-480-value="337"', 'data-field-top-res-480-value="373" data-field-left-res-480-value="209"'],
  ['data-field-top-res-640-value="341" data-field-left-res-640-value="417"', 'data-field-top-res-640-value="431" data-field-left-res-640-value="289"'],
  ['data-field-top-res-960-value="341" data-field-left-res-960-value="579"', 'data-field-top-res-960-value="431" data-field-left-res-960-value="451"'],
  ['data-elem-id="1775703109073" data-elem-type="image" data-field-top-value="-2" data-field-left-value="136"', 'data-elem-id="1775703109073" data-elem-type="image" data-field-top-value="88" data-field-left-value="-70"'],
];

for (const [from, to] of replacements) {
  const count = html.split(from).length - 1;
  html = html.split(from).join(to);
  console.log(`${from} → ${to} (${count}×)`);
}

for (const [from, to] of calendarMoves) {
  const count = html.split(from).length - 1;
  html = html.split(from).join(to);
  console.log(`calendar: (${count}×)`);
}

// Reception: user gave only venue; keep 18:00 or remove — leave 18:00 unless only one event at 15:00
// Ceremony title stays Պսակադրություն at 15:00

fs.writeFileSync(htmlPath, html);
console.log("Updated", htmlPath);
