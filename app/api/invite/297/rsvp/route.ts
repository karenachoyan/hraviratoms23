import { NextResponse } from "next/server";
import { sendRsvpExcelEmail, isEmailConfigured } from "@/lib/rsvp/email";
import { appendRsvpEntry, readRsvpEntries } from "@/lib/rsvp/storage";
import type { RsvpPayload } from "@/lib/rsvp/types";

export const runtime = "nodejs";

const ATTENDING = "Մենք կգանք";

function validatePayload(body: unknown): RsvpPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;
  const side = typeof data.side === "string" ? data.side.trim() : "";
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const attendance =
    typeof data.attendance === "string" ? data.attendance.trim() : "";
  const guestCount =
    typeof data.guestCount === "string" ? data.guestCount.trim() : "";

  if (!side || !name || !attendance) return null;

  if (attendance === ATTENDING && !guestCount) return null;

  return { side, name, attendance, guestCount };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = validatePayload(body);

    if (!payload) {
      return NextResponse.json(
        { ok: false, message: "Խնդրում ենք լրացնել բոլոր պահանջվող դաշտերը" },
        { status: 400 },
      );
    }

    const entry = await appendRsvpEntry(payload);
    const entries = await readRsvpEntries();

    let emailSent = false;
    if (isEmailConfigured()) {
      try {
        await sendRsvpExcelEmail(entries, entry);
        emailSent = true;
      } catch (emailError) {
        console.error("RSVP email failed:", emailError);
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Շնորհակալություն",
      total: entries.length,
      emailSent,
    });
  } catch (error) {
    console.error("RSVP submission failed:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Չհաջողվեց ուղարկել։ Խնդրում ենք փորձել մի փոքր ուշ։",
      },
      { status: 500 },
    );
  }
}
