'use strict';

const _map = new Map();

class CacheService {
  find(path) {
    if (_map.has(path)) {
      return _map.get(path);
    }

    return null;
  }

  has(path) {
    return _map.has(path);
  }

  put(path, pathModel) {
    _map.set(path, pathModel);
  }
}

export default new CacheService();