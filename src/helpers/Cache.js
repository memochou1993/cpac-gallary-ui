class Cache {
  static set(key, value, minutes) {
    localStorage.setItem(JSON.stringify(key), JSON.stringify({
      created_at: Date.now(),
      expires_in: minutes,
      data: value,
    }));
  }

  static get(key) {
    const cache = JSON.parse(localStorage.getItem(JSON.stringify(key)));
    if (!cache) {
      return null;
    }
    if (Date.now() - cache.created_at > cache.expires_in * 60 * 1000) {
      return null;
    }
    return cache.data;
  }
}

export default Cache;
