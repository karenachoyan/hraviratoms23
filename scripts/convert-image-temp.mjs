import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(
  root,
  ".cursor",
  "projects",
  "c-Users-user-OneDrive-Desktop-hraviratoms",
  "assets",
  "c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_05536d8e7587e2d88cea6606bd6ec527_images_IMG_6068-5c215e6d-5fcc-45f4-8700-e53dd659cdbd.png",
);
const altSrc =
  "C:\\Users\\user\\.cursor\\projects\\c-Users-user-OneDrive-Desktop-hraviratoms\\assets\\c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_05536d8e7587e2d88cea6606bd6ec527_images_IMG_6068-5c215e6d-5fcc-45f4-8700-e53dd659cdbd.png";

const source = fs.existsSync(src) ? src : altSrc;
if (!fs.existsSync(source)) {
  console.error("Source image not found:", source);
  process.exit(1);
}

const outDir = path.join(root, "public", "invite", "297");
fs.mkdirSync(outDir, { recursive: true });

for (const name of ["couple-photo.jpg", "hero-couple.jpg"]) {
  fs.copyFileSync(source, path.join(outDir, name));
  console.log("Written", name);
}
