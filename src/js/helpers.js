import { API_TIMEOUT_VALUE } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(API_TIMEOUT_VALUE)]);

    if (!res.ok) throw new Error(`Failed to fetch data! (${res.status})`);

    return await res.json();
  } catch (err) {
    throw err;
  }
};
