export const stringify = (parsed) => {
  return Object.keys(parsed)
    .filter(key => parsed[key] !== undefined) // 過濾掉值為 undefined 的鍵
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parsed[key])}`)
    .join('&');
};