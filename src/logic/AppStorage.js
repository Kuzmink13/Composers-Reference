class AppStorage {
  static getItem(key) {
    return localStorage.getItem(key);
  }

  static getBoolean(key) {
    return Boolean(Number(this.getItem(key)));
  }

  static getBooleanArray(key) {
    const arr = this.getItem(key);
    return arr ? arr.split(',').map((el) => Boolean(Number(el))) : null;
  }

  static setItem(key, value) {
    localStorage.setItem(key, value);
  }

  static setBoolean(key, bool) {
    this.setItem(key, Number(bool));
  }

  static setBooleanArray(key, arr) {
    this.setItem(
      key,
      arr.map((el) => Number(el))
    );
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }
}

export default AppStorage;
