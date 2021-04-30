export function formatDate(date) {
  return new Date(date).toISOString();
}

/** expects an ISO string */
export function parseDate(dateISOString) {
  return new Date(dateISOString);
}

/** returns date object */
export function getCurrentDate() {
  const currentDateISO = new Date().toISOString();
  return new Date(currentDateISO);
}

/** returns ISO string */
export function getCurrentDateISO() {
  return new Date().toISOString();
}
