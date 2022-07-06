export function storeCurrentUser(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCurrentData(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
}

export function clearCurrentData(key) {
  localStorage.removeItem(key);
}
