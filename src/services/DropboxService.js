'use strict';

import {Dropbox} from 'dropbox';
import PathModel from '../models/PathModel';
import cache from './CacheService';

class DropboxService {
  constructor() {
    this.dbx = new Dropbox({accessToken: ''});
    window.dbx = this.dbx;
  }

  getUser() {
    return this.dbx.usersGetCurrentAccount()
      .then((data) => {
        return {
          email: data.email,
          displayName: data.name.display_name
        };
      });
  }

  getSpaceUsage() {
    return this.dbx.usersGetSpaceUsage()
      .then((data) => {
        return {
          used: data.used,
          allocated: data.allocation.allocated
        };
      });
  }

  listFolder(path) {
    if (cache.has(path)) {
      return Promise.resolve(cache.find(path));
    }

    return this.dbx.filesListFolder({path: path})
      .then((data) => {
        cache.put(path, data);
        return data;
      });
  }

  getThumbnail(path) {
    if (cache.has(path)) {
      return Promise.resolve(cache.find(path));
    }

    return this.dbx.filesGetThumbnail({path: path, size: 'w480h320'})
      .then((data) => {
        cache.put(path, data);
        return data;
      });
  }

  loadInitialData() {
    return Promise.all([
      this.getUser(),
      this.getSpaceUsage(),
      this.listFolder('')
    ])
      .then((values) => {
        return {
          user: values[0],
          spaceUsage: values[1],
          paths: [
            new PathModel('', '', values[2])
          ],
          loaded: true
        }
      });
  }
}

export default new DropboxService();
