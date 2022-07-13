import { Point } from './point.class';

export class TrigonometryHelper {
  static rotatePointByDegrees(
    pointToRotate: Point,
    centerPoint: Point,
    angleDegrees: number
  ): Point {
    let radians = (Math.PI / 180) * angleDegrees;
    let cos = Math.cos(radians);
    let sin = Math.sin(radians);
    // let nx = (cos * (pointToRotate.x = centerPoint.x)) + (sin * (pointToRotate.y - centerPoint.y)) + centerPoint.x;
    // let ny = (cos * (pointToRotate.y = centerPoint.y)) + (sin * (pointToRotate.x - centerPoint.x)) + centerPoint.y;

    let rx =
      cos * (pointToRotate.x - centerPoint.x) -
      sin * (pointToRotate.y - centerPoint.y) +
      centerPoint.x;
    var ry =
      sin * (pointToRotate.x - centerPoint.x) +
      cos * (pointToRotate.y - centerPoint.y) +
      centerPoint.y;
    // return new Point(nx,ny);
    // let origPt = new Point( nx, ny);
    let pt = new Point(this.roundTo10(rx), this.roundTo10(ry));
    // console.log( pointToRotate, pt, centerPoint );
    return pt;
  }

  // ROUND FRACTION TO 10 DECIMAL PLACES...
  static roundTo10(x: number) {
    let pow = Math.pow(10, 10);
    return Math.round(x * pow) / pow;
  }

  static slope(p1: Point, p2: Point): number {
    // not really needed, since you can use Math.atan2( y,x) to calculate radians directly....
    // change in y/change in x...
    // if (p1.distance(p2)==0) return NaN;
    let deltaY = p1.y - p2.y;
    if (deltaY == 0) return 0;
    let deltaX = p1.x - p1.x;
    if (deltaX == 0) return Infinity * (deltaY >= 0 ? 1 : -1);
    return deltaY / deltaX;
  }

  // GET ANGLE OF TWO POINTS (IN RADIANS)...
  static radiansFromPoints(p1: Point, p2: Point): number {
    return Math.atan2(p1.y - p2.y, p1.x - p2.x);
  }

  // GET ANGLE OF TWO POINTS (IN DEGREES)...
  static degreesFromPoints(p1: Point, p2: Point): number {
    return TrigonometryHelper.degreesFromRadians(
      TrigonometryHelper.radiansFromPoints(p1, p2)
    );
  }

  static degreesFromRadians(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  static radiansFromDegrees(degrees: number): number {
    return (Math.PI * degrees) / 180;
  }
} //end class
