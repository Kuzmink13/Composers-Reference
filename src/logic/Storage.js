export const keys = {
  overlay: { keys: 'keys', noteNames: 'noteNames' },
  selectionFilter: 'selectionFilter',
  quickGuide: { isGuideDismissed: 'isGuideDismissed' },
};

export function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setItem(key, value) {
  localStorage.setItem(key, value);
}

export function removeItem(key) {
  localStorage.removeItem(key);
}
