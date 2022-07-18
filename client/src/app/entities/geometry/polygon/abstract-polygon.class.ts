import { Line } from '../core/line.class';
import { Point } from '../core/point.class';
import { Size } from '../core/size.class';
import { Polygon } from './polygon.class';

export abstract class AbstractPolygon {
  protected _verticesArr: Point[] = [];
  protected _polygon: Polygon | undefined;
  protected _sides: Line[] | undefined;

  abstract get centerPoint(): Point;
  abstract get polygon(): Polygon;

  constructor() {}

  public get vertices(): Point[] {
    return this._verticesArr;
  }

  public getVertex(i: number): Point {
    let vCnt = this.vertices.length;
    if (this.vertices.length == 0) return new Point(0, 0);
    i = Math.floor(i); //force to integer...
    i = i % vCnt;
    if (i < 0) i += vCnt;
    return this._verticesArr[i];
  }

  public getSide(index: number): Line {
    let p1 = this.getVertex(index);
    let p2 = this.getVertex(index + 1);
    let line = new Line(p1, p2);
    return line;
  }

  public get sides(): Line[] {
    if (this._sides) {
      return this._sides;
    }
    // CONSTRUCT OUR SIDES TO RETURN...
    this._sides = [];
    // for (let x=this.vertices.length-1; x>=0; x--){
    for (let x = 0; x < this.vertices.length; x++) {
      let side = this.getSide(x);
      this._sides.push(side);
    }
    return this._sides;
  }

  get bounds(): { origin: Point; size: Size } {
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    this.vertices.forEach((pt: Point) => {
      minX = Math.min(pt.x, minX);
      minY = Math.min(pt.y, minY);
      maxX = Math.max(pt.x, maxX);
      maxY = Math.max(pt.y, maxY);
    });
    let pt = new Point(minX, minY);
    let sz = new Size(maxX - minX, maxY - minY);
    return { origin: pt, size: sz };
  }

  public containsPoint(pt: Point): boolean {
    // CREATE LINE OFF TO RIGHT OF POINT GOING TO INFINITY...
    let rMax = this.bounds.origin.x + this.bounds.size.width + 9999999999;
    let line = new Line(pt, new Point(rMax, pt.y));
    // COUNT THE NUMBER OF TIMES THIS LINE CROSSES THE POLYGON...
    let count = 0;
    this.sides.forEach((side) => {
      if (Line.doLinesIntersect(line, side)) {
        count++;
      }
    });
    // A point is inside the polygon if either count of intersections is odd or  point lies on an edge of polygon.  If none of the conditions is true, then point lies outside.
    return count % 2 == 1;
  }

  public toString(): string {
    let str = 'SHAPE: ';
    this.vertices.forEach((v) => {
      str += Math.round(v.x).toString() + ',' + Math.round(v.y).toString() + ': ';
    });
    return str;
  }
} // end class...
