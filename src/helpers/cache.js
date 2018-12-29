const Cache = {
  set(key, value, lifetime) {
    localStorage.setItem(key, JSON.stringify({
      created_at: Date.now(),
      expires_in: lifetime,
      data: value,
    }));
  },
  get(key) {
    const cache = JSON.parse(localStorage.getItem(key));
    if (cache) {
      if (Date.now() - cache.created_at < cache.expires_in * 24 * 60 * 60 * 1000) {
        return cache.data;
      }
    }
    return null;
  },
};

export default Cache;
