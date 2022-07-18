export class Util {
  static isArray(obj: any): boolean {
    return Array.isArray(obj);
  }

  // static arrayOrNull( obj:any ):any[]|null{
  //   if (Array.isArray( obj)) return obj;
  //   return null;
  // }

  static isNumber(obj: any): boolean {
    return typeof obj === 'number';
  }

  static isBoolean(obj: any) {
    return typeof obj === 'boolean';
  }

  static isFunction(obj: any) {
    return typeof obj === 'function';
  }

  static isNull(obj: any) {
    return obj === null;
  }

  static isNullOrUndefined(obj: any) {
    return obj === null || obj === undefined;
  }

  static isObject(obj: any) {
    return obj != null && typeof obj === 'object';
  }

  static isString(obj: any) {
    return typeof obj === 'string';
  }

  static isUndefined(obj: any) {
    return obj === undefined;
  }

  static setIntersection(setA: Set<any>, setB: Set<any>) {
    let intersection = new Set();
    setB.forEach((item) => {
      if (setA.has(item)) intersection.add(item);
    });
    return intersection;
  }
} //end class
