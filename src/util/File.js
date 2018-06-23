'use strict';

const imagesList = ['jpg', 'jpeg', 'gif', 'png', 'svg'];
const videoList = ['mp4', 'avi', 'mov', 'mkv', '3gp', '3g2', 'asf', 'f4v', 'ismv', 'm4v', 'mpeg', 'wmv'];
const audioList = ['mp3', 'wav', 'aac', 'amr', 'flac', 'm4a', 'wma'];
const docList = ['doc', 'dot', 'txt', 'docx', 'dotx', 'docm', 'dotm', 'json', 'xml', 'js'];
const xlsList = ['xls', 'xlt', 'xlsx', 'xltx', 'xlsm', 'xltm', 'csv'];
const pptList = ['ppt', 'pot', 'pps', 'pptx', 'potx', 'ppsx', 'pptm', 'potm', 'ppsm'];
const archiveList = ['tar', 'gz', 'zip', 'rar', '7z'];

const typesMap = {};
typesMap['pdf'] = 'pdf';
imagesList.forEach((ext) => typesMap[ext] = 'image');
videoList.forEach((ext) => typesMap[ext] = 'video');
audioList.forEach((ext) => typesMap[ext] = 'audio');
docList.forEach((ext) => typesMap[ext] = 'word');
xlsList.forEach((ext) => typesMap[ext] = 'excel');
pptList.forEach((ext) => typesMap[ext] = 'powerpoint');
archiveList.forEach((ext) => typesMap[ext] = 'archive');

class File {

  static fileName(filePath = '') {
    let parts = filePath.split('/');
    return parts[parts.length - 1];
  }

  static extension(nameOrPath) {
    let parts = nameOrPath.split(".");
    return parts[parts.length - 1];
  }

  static isImage(extension) {
    return imagesList.some((ext) => ext === extension.toLowerCase());
  }

  static isPdf(extension) {
    return extension.toLowerCase() === 'pdf';
  }

  static fileType(nameOrPath) {
    let extension = File.extension(nameOrPath);
    let type = typesMap[extension.trim().toLowerCase()];
    if (type) {
      return type;
    }

    return 'unknown';
  }
}

export default File;