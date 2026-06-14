import * as XLSX from "xlsx";
import type { RsvpEntry } from "./types";

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  return date.toLocaleString("hy-AM", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function buildRsvpWorkbookBuffer(entries: RsvpEntry[]): Buffer {
  const rows = entries.map((entry, index) => ({
    "№": index + 1,
    "Ամսաթիվ": formatDate(entry.submittedAt),
    "Կողմ": entry.side,
    "Անուն Ազգանուն": entry.name,
    "Ներկայություն": entry.attendance,
    "Հյուրերի թիվ": entry.guestCount || "—",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 5 },
    { wch: 20 },
    { wch: 14 },
    { wch: 28 },
    { wch: 18 },
    { wch: 14 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "RSVP");

  return Buffer.from(
    XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }),
  );
}
