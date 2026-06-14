import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const html = fs.readFileSync(path.join(root, "tmp-invite-297.html"), "utf8");

const map = {
  "https://static.tildacdn.one/tild6165-3631-4333-b434-313232663438/3_-_Copy.jpg":
    "/invite/297/hero-couple.jpg",
  "https://optim.tildacdn.one/tild6165-3631-4333-b434-313232663438/-/format/webp/3_-_Copy.jpg.webp":
    "/invite/297/hero-couple.jpg",
  "https://thb.tildacdn.one/tild6165-3631-4333-b434-313232663438/-/resizeb/20x/3_-_Copy.jpg":
    "/invite/297/hero-couple.jpg",
  "https://static.tildacdn.one/tild3233-6338-4437-b536-353437353936/3.jpg":
    "/invite/297/hero-couple.jpg",
  "https://thb.tildacdn.one/tild3233-6338-4437-b536-353437353936/-/resizeb/20x/3.jpg":
    "/invite/297/hero-couple.jpg",
  "https://static.tildacdn.one/tild3332-3937-4533-b731-303936376332/a3e6d7f434d352c65971.jpg":
    "/invite/297/paper-texture.jpg",
  "https://static.tildacdn.one/tild3261-3732-4162-a365-353737653235/4e3e7c39e03b3d6df654.jpg":
    "/invite/297/couple-photo.jpg",
  "https://static.tildacdn.one/tild6465-6630-4538-a430-616536303864/photo_1.svg":
    "/invite/297/polaroid-frame.svg",
  "https://static.tildacdn.one/tild6563-6237-4462-b563-366434353935/stamp.webp":
    "/invite/297/stamp.webp",
  "https://optim.tildacdn.one/tild6563-6237-4462-b563-366434353935/-/resize/122x/-/format/webp/stamp.webp":
    "/invite/297/stamp.webp",
  "https://static.tildacdn.one/tild3738-3533-4132-b831-303339333135/svg_1775687772886.svg":
    "/invite/297/decor-script.svg",
  "https://static.tildacdn.one/tild3935-3166-4230-b637-633761646430/new-img-white-2.svg":
    "/invite/297/polaroid-white.svg",
  "https://static.tildacdn.one/tild6130-6664-4731-b462-346565306436/new-img-white-2.svg":
    "/invite/297/polaroid-white.svg",
  "https://static.tildacdn.one/tild6339-6563-4530-a235-323633613034/Setpember.svg":
    "/invite/297/september-calendar.svg",
  "https://static.tildacdn.one/tild6437-3936-4438-b564-343732623231/svg_1775702106215.svg":
    "/invite/297/program-title.svg",
  "https://static.tildacdn.one/tild3132-3166-4463-b932-336561626236/fl-right.svg":
    "/invite/297/floral-left.svg",
  "https://static.tildacdn.one/tild3035-6663-4135-a636-636439356639/srtink2.png":
    "/invite/297/floral-branch.png",
  "https://optim.tildacdn.one/tild3035-6663-4135-a636-636439356639/-/resize/134x/-/format/webp/srtink2.png.webp":
    "/invite/297/floral-branch.png",
  "https://static.tildacdn.one/tild3432-3262-4564-b632-366134646533/1_-_Copy.png":
    "/invite/297/church.png",
  "https://thb.tildacdn.one/tild3432-3262-4564-b632-366134646533/-/empty/1_-_Copy.png":
    "/invite/297/church.png",
  "https://static.tildacdn.one/tild6461-6437-4465-a562-663131366162/2_-_Copy.png":
    "/invite/297/hall.png",
  "https://thb.tildacdn.one/tild6461-6437-4465-a562-663131366162/-/empty/2_-_Copy.png":
    "/invite/297/hall.png",
  "https://static.tildacdn.one/tild3764-3539-4232-a365-303832366133/Artboard_1.svg":
    "/invite/297/play-button.svg",
  "https://static.tildacdn.one/tild3536-6432-4261-b564-333765613130/hraver_logo_centre.svg":
    "/invite/297/hraver-logo.svg",
  "https://static.tildacdn.one/tild3637-3537-4734-b136-373531316665/logo_gold.svg":
    "/invite/297/logo-gold.svg",
  "https://static.tildacdn.one/tild6131-6639-4435-a138-386462616330/close-x-svgrepo-com.svg":
    "/invite/297/close.svg",
  "https://static.tildacdn.one/tild3038-6637-4563-a266-643330363662/payment_methods.svg":
    "/invite/297/payment-methods.svg",
  "https://static.tildacdn.one/tild3136-6334-4237-b430-383539346665/83e58ccae46ef02c65fa.jpg":
    "/invite/297/footer-bg.jpg",
  "https://static.tildacdn.one/tild6332-3038-4631-b761-313066356563/1200_new_copy.jpg":
    "/invite/297/section-bg.jpg",
};

let processed = html;
for (const [from, to] of Object.entries(map)) {
  processed = processed.split(from).join(to);
}

const start = processed.indexOf('<div id="allrecords"');
const marker = "</div> <!--/allrecords-->";
const endIdx = processed.indexOf(marker);
const body =
  start >= 0 && endIdx >= 0
    ? processed.slice(start, endIdx + "</div>".length)
    : processed;

const outDir = path.join(root, "public/invite/297");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "allrecords.html"), body);

const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
let head = headMatch ? headMatch[1] : "";
head = head.replace(/<script[\s\S]*?<\/script>/gi, "");
head = head.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
fs.writeFileSync(path.join(outDir, "head-fragments.html"), head);

const cssLinks = [...head.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)].map(
  (m) => m[0],
);
fs.writeFileSync(
  path.join(outDir, "stylesheets.json"),
  JSON.stringify(cssLinks, null, 2),
);

console.log("Wrote allrecords.html", body.length, "bytes");
console.log("Stylesheets:", cssLinks.length);
