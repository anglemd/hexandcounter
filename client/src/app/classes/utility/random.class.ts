import { Util } from './util.class';

export class Random {
  static generateRandomNo(max: number, min: number = 0) {
    if (!Util.isNumber(min) || min > max) min = 0;
    max++;
    let rnd = Math.floor(Math.random() * max + min);
    return rnd;
  }

  // RETURN AN ARRAY cnt LONG, WITH INTEGERS 1 to cnt-1 IN RANDOM POSITIONS IN THE LIST.
  static generateRankedItems(cnt: number): number[] {
    let objCnt = cnt;
    let objArr: { value: number; rnd: number }[] = [];
    for (let x = 0; x < objCnt; x++) {
      let obj = {
        value: x + 1,
        rnd: Random.generateRandomNo(objCnt * 100000, 0),
      };
      objArr.push(obj);
    }
    let sortArr = objArr.sort((a, b) => {
      if (a.rnd > b.rnd) return 1;
      return -1;
    });
    let retArr: number[] = [];
    sortArr.forEach((obj) => {
      retArr.push(obj.value);
    });
    return retArr;
  }
}
