'use strict';

class PathModel {
  path = '';
  name = '';
  list = {
    entries: [],
    has_more: false,
    cursor: ''
  };

  constructor(path = '', name = '', list = {entries: [], has_more: false, cursor: ''}) {
    this.path = path;
    this.name = name;
    this.list = list;
  }
}

export default PathModel;