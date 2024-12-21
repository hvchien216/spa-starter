export const sessionClientStorage = {
  save<T>(key: string, value: T) {
    const _val = JSON.stringify(value);
    return sessionStorage.setItem(key, _val);
  },

  get(key: string) {
    return sessionStorage.getItem(key);
  },

  remove(key: string) {
    return sessionStorage.removeItem(key);
  },
};
