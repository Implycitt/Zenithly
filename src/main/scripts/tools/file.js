import fs from 'fs';

class Json {

  static createJson(object) {
    return JSON.stringify(object, null, 2);
  }

  static parseObject(json) {
    return JSON.parse(json);
  }

}

function addData(path, object) {
  if (!fs.existsSync(path)) {
    fs.openSync(path, 'w');
  }

  let readData = Json.parseObject(window.electron.ipcRenderer.send('getter', path));
  let out;
  // console.log(readData);

  if (readData == undefined || readData == "") {
    out = object;
  } else {
    out = Object.assign(object, readData);
  }

  // window.electron.ipcRenderer.send('append', path, out);
}

export { Json,  addData }

