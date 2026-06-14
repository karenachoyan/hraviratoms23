import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { RsvpEntry, RsvpPayload, RsvpStore } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "invite", "297");
const DATA_FILE = path.join(DATA_DIR, "rsvp.json");

async function ensureStore(): Promise<RsvpStore> {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as RsvpStore;
    if (Array.isArray(parsed.entries)) return parsed;
  } catch {
    // first run or invalid file
  }

  const empty: RsvpStore = { entries: [] };
  await writeFile(DATA_FILE, JSON.stringify(empty, null, 2), "utf8");
  return empty;
}

export async function readRsvpEntries(): Promise<RsvpEntry[]> {
  const store = await ensureStore();
  return store.entries;
}

export async function appendRsvpEntry(payload: RsvpPayload): Promise<RsvpEntry> {
  const store = await ensureStore();
  const entry: RsvpEntry = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    side: payload.side.trim(),
    name: payload.name.trim(),
    attendance: payload.attendance.trim(),
    guestCount: (payload.guestCount ?? "").trim(),
  };

  store.entries.push(entry);
  await writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
  return entry;
}
