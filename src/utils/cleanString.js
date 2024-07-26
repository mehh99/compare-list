// src/utils/cleanString.js
export function cleanString(str) {
    // Hapus tanggal dan waktu dengan regular expression
    // Contoh: "Jul 25, 2024, 10:37 PM" dihapus, menyisakan nama atau teks
    const cleanedString = str.replace(/^[A-Za-z]+\s\d{1,2},\s\d{4},?\s\d{1,2}:\d{2}\s[APM]{2}|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g, '').trim();
    return cleanedString;
  }
  