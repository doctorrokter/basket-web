'use strict';

import {Dropbox} from 'dropbox';

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
    return this.dbx.filesListFolder({path: path})
      .then((data) => {
        return data;
      });
  }

  getThumbnail(path) {
    return this.dbx.filesGetThumbnail({path: path, size: 'w480h320'})
      .then((data) => {
        return data;
      });
  }
}

export default new DropboxService();
