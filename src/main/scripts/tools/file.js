import objectScan from 'object-scan';

class Json {

  static createJson(object) {
    return JSON.stringify(object, null, 2);
  }

  static parseObject(json) {
    return JSON.parse(json);
  }

  static findById(id, data) {
    return objectScan(['**.id'], {
      abort: true,
      rtn: 'parent',
      filterFn: ({ value }) => value === id
    })(data);
  }

  static getCountById(id, data) {
    return objectScan(['**.id'], {
      abort: true,
      rtn: 'count',
      filterFn: ({ value }) => value === id
    })(data);
  }

  static createId() {
    let date = new Date(Date.now());
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }
}

export { Json }

