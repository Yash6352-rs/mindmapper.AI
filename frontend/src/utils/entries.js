const STORAGE_KEY = 'mindmapper_entries';

export function saveEntry(entry) {
  const existing = getEntries();
  existing.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getEntries() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
