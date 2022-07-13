import { Point } from './point.class';

export class Line {
  private readonly _p1: Point;
  private readonly _p2: Point;

  constructor(p1: Point, p2: Point) {
    this._p1 = p1;
    this._p2 = p2;
  }

  get p1(): Point {
    return this._p1;
  }
  get p2(): Point {
    return this._p2;
  }

  get width(): number {
    return this.p2.x - this.p1.x;
  }
  get height(): number {
    return this.p2.y - this.p1.y;
  }

  get midPoint(): Point {
    let x = (this.p1.x + this.p2.x) / 2;
    let y = (this.p1.y + this.p2.y) / 2;
    return new Point(x, y);
  }

  get length(): number {
    // DETERMINE HYPOTENUSE LENGTH...
    let l = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
    return l;
  }

  // get boundingRect():Recatangle{ return new Recatangle( this.p1, new Size(this.width, this.height )); }

  public toString(): string {
    return this._p1.toString() + ', ' + this._p2.toString();
  }

  static computeIntersection(l1: Line, l2: Line): LineIntersectionInfo {
    let p1 = l1.p1;
    let p2 = l1.p2;
    let p3 = l2.p1;
    let p4 = l2.p2;
    //https://jsfiddle.net/ferrybig/eokwL9mp/
    const h1: number = Line.computeH(p1, p2, p3, p4);
    const h2: number = Line.computeH(p3, p4, p1, p2);
    const isParallel: boolean = isNaN(h1) || isNaN(h2);

    const f = { x: p4.x - p3.x, y: p4.y - p3.y };
    return {
      doLinesTouch: h1 >= 0 && h1 <= 1 && h2 >= 0 && h2 <= 1, // IF FALSE, IT MEANS THE INTERSECTION POINT IS BEYOND THE EXTENT OF THE TWO LINES....
      isParallel, // IF TRUE, THE TWO LINES ARE PARALLEL...
      intersectPoint: isParallel
        ? undefined
        : new Point(p3.x + f.x * h1, p3.y + f.y * h1),
    };
  }

  // USED ONLY BY computeIntersection()...
  private static computeH(a: Point, b: Point, c: Point, d: Point): number {
    // E = B-A = ( Bx-Ax, By-Ay )
    const e = { x: b.x - a.x, y: b.y - a.y };
    // F = D-C = ( Dx-Cx, Dy-Cy )
    const f = { x: d.x - c.x, y: d.y - c.y };
    // P = ( -Ey, Ex )
    const p = { x: -e.y, y: e.x };

    // h = ( (A-C) * P ) / ( F * P )
    const intersection = f.x * p.x + f.y * p.y;
    // const intersection = (a.x-c.x)*p.x + f.y*p.y;
    if (intersection === 0) {
      // Paralel lines
      return NaN;
    }
    return ((a.x - c.x) * p.x + (a.y - c.y) * p.y) / intersection;
  }

  // Given three colinear points p, q, r, the function checks if
  // point q lies on line segment 'pr'
  private static onSegment(p: Point, q: Point, r: Point): boolean {
    if (
      q.x <= Math.max(p.x, r.x) &&
      q.x >= Math.min(p.x, r.x) &&
      q.y <= Math.max(p.y, r.y) &&
      q.y >= Math.min(p.y, r.y)
    ) {
      return true;
    }
    return false;
  }

  // To find orientation of ordered triplet (p, q, r).
  // The function returns following values
  // 0 --> p, q and r are colinear
  // 1 --> Clockwise
  // 2 --> Counterclockwise
  private static orientation(p: Point, q: Point, r: Point): number {
    // RETURNS 0, 1, 2
    // See https://www.geeksforgeeks.org/orientation-3-ordered-points/  for details of below formula.
    let val: number = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

    if (val == 0) return 0; // colinear

    return val > 0 ? 1 : 2; // clock or counterclock wise
  }

  static doLinesIntersect(l1: Line, l2: Line): boolean {
    return Line.doPointsIntersect(l1.p1, l1.p2, l2.p1, l2.p2);
  }
  // The main function that returns true if line segment 'p1q1' and 'p2q2' intersect.
  static doPointsIntersect(
    p1: Point,
    q1: Point,
    p2: Point,
    q2: Point
  ): boolean {
    // Find the four orientations needed for general and special cases
    let o1 = Line.orientation(p1, q1, p2);
    let o2 = Line.orientation(p1, q1, q2);
    let o3 = Line.orientation(p2, q2, p1);
    let o4 = Line.orientation(p2, q2, q1);

    // General case
    if (o1 != o2 && o3 != o4) return true;

    // Special Cases
    // p1, q1 and p2 are colinear and p2 lies on segment p1q1
    if (o1 == 0 && Line.onSegment(p1, p2, q1)) return true;

    // p1, q1 and q2 are colinear and q2 lies on segment p1q1
    if (o2 == 0 && Line.onSegment(p1, q2, q1)) return true;

    // p2, q2 and p1 are colinear and p1 lies on segment p2q2
    if (o3 == 0 && Line.onSegment(p2, p1, q2)) return true;

    // p2, q2 and q1 are colinear and q1 lies on segment p2q2
    if (o4 == 0 && Line.onSegment(p2, q1, q2)) return true;

    return false; // Doesn't fall in any of the above cases
  }

  static splitLine(line: Line): Line[] {
    let leftSide = new Line(line.p1, line.midPoint);
    let rightSide = new Line(line.midPoint, line.p2);
    return [leftSide, rightSide];
  }

  static checkLineIntersection(line1: Line, line2: Line): LineIntersectionInfo {
    let intersectX: number | null = null;
    let intersectY: number | null = null;
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    let result: LineIntersectionInfo = {
      intersectPoint: undefined, // Point where lines cross (use linesTouch property to see if this point falls on both lines)...
      isParallel: true,
      doLinesTouch: false,
      onLine1: false, // CAN THE INTERSECTION BE PROJECTED ONTO THE LENGTH OF LINE 1?
      onLine2: false, // CAN THE INTERSECTION BE PROJECTED ONTO THE LENGTH OF LINE 2?
    };
    let denominator =
      (line2.p2.y - line2.p1.y) * (line1.p2.x - line1.p1.x) -
      (line2.p2.x - line2.p1.x) * (line1.p2.y - line1.p1.y);
    if (denominator == 0) {
      return result;
    }
    let a = line1.p1.y - line2.p1.y;
    let b = line1.p1.x - line2.p1.x;
    let numerator1 =
      (line2.p2.x - line2.p1.x) * a - (line2.p2.y - line2.p1.y) * b;
    let numerator2 =
      (line1.p2.x - line1.p1.x) * a - (line1.p2.y - line1.p1.y) * b;
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    intersectX = line1.p1.x + a * (line1.p2.x - line1.p1.x);
    intersectY = line1.p1.y + a * (line1.p2.y - line1.p1.y);
    result.intersectPoint = new Point(intersectX, intersectY);
    result.isParallel = false;

    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
      result.onLine1 = true;
    } else if (
      (line1.p1.x == intersectX && line1.p1.y == intersectY) ||
      (line1.p2.x == intersectX && line1.p2.y == intersectY)
    ) {
      result.onLine1 = true; // INTERSECTION IS ON END POINT OF LINE...
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
      result.onLine2 = true;
    } else if (
      (line2.p1.x == intersectX && line2.p1.y == intersectY) ||
      (line2.p2.x == intersectX && line2.p2.y == intersectY)
    ) {
      result.onLine2 = true;
    }
    if (result.onLine1 && result.onLine2) {
      result.doLinesTouch = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
  }
} //end class

export interface LineIntersectionInfo {
  intersectPoint?: { x: number; y: number } | undefined; // UNDEFINED IF LINES ARE PARALLEL....
  doLinesTouch: boolean; // IF FALSE, IT MEANS THE INTERSECTION POINT IS BEYOND THE EXTENT OF THE TWO LINES....
  isParallel: boolean; // IF TRUE, THE TWO LINES ARE PARALLEL...
  // THESE TWO OPTIONAL PARAMS ONLY GET GENERATED WHEN checkLineIntersection() IS USED....
  onLine1?: boolean;
  onLine2?: boolean;
}
