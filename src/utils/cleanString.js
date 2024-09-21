// src/utils/cleanString.js
export function cleanString(str) {
  // Hapus tanggal dan waktu dengan regular expression
  // Menghapus format seperti "4:20 pm", "11:00 pm", dll.
  const cleanedString = str.replace(/(?:Sep|Oct|Nov|Dec|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug)\s\d{1,2},\s\d{4}\s\d{1,2}:\d{2}\s[APM]{2}|(?:Sep|Oct|Nov|Dec|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug)\s\d{1,2},\s\d{4}|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}|(?:\d{1,2}:\d{2}\s[APM]{2}|\d{1,2}:\d{2})/g, '').trim();
  return cleanedString;
}
