// THIS RECTANGE IS ALWAYS ORIENTED ALONG AXIS.

import { Point } from '../core/point.class';
import { Size } from '../core/size.class';
import { AbstractPolygon } from '../polygon/abstract-polygon.class';
import { Polygon } from '../polygon/polygon.class';

export class Rectangle extends AbstractPolygon {
  private _origin: Point;
  private _size: Size;

  constructor(origin: Point, size: Size) {
    super();
    this._origin = origin;
    this._size = size;

    let p1 = new Point(this.left, this.top);
    let p2 = new Point(this.right, this.top);
    let p3 = new Point(this.right, this.bottom);
    let p4 = new Point(this.left, this.bottom);

    this._verticesArr = [p1, p2, p3, p4]; // add to super class...
  }

  get polygon(): Polygon {
    if (this._polygon) return this._polygon;
    this._polygon = new Polygon(this._verticesArr);
    return this.polygon;
  }

  get origin(): Point {
    return this._origin;
  }
  get size(): Size {
    return this._size;
  }

  get width(): number {
    return this.size.width;
  }
  get height(): number {
    return this.size.height;
  }

  get top(): number {
    return Math.min(this.origin.y, this.origin.y + this.height);
  }
  get bottom(): number {
    return Math.max(this.origin.y, this.origin.y + this.height);
  }
  get left(): number {
    return Math.min(this.origin.x, this.origin.x + this.width);
  }
  get right(): number {
    return Math.max(this.origin.x, this.origin.x + this.width);
  }

  public override containsPoint(p: Point) {
    let contains = false;
    if (
      p.x >= this.left &&
      p.x <= this.right &&
      p.y >= this.top &&
      p.y <= this.bottom
    )
      contains = true;
    return contains;
  }

  get centerPoint(): Point {
    let x = (this.origin.x + this.width) / 2;
    let y = (this.origin.y + this.height) / 2;
    return new Point(x, y);
  }
} //end class.....
