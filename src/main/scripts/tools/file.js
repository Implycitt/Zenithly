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
}

export { Json }

