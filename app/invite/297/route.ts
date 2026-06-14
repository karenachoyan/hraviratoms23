import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "invite",
    "297",
    "index.html",
  );
  const html = await readFile(filePath, "utf8");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
