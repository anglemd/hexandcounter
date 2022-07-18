import { Point } from '../core/point.class';
import { TrigonometryHelper } from '../core/trigonometry-helper.class';
import { Rectangle } from '../rectangle/rectangle.class';
import { AbstractPolygon } from './abstract-polygon.class';

export class Polygon extends AbstractPolygon {
  constructor(vertices: Point[]) {
    super();
    this._verticesArr = vertices;
  }

  get centerPoint() {
    let b = this.bounds;
    let cx = b.origin.x + b.size.width / 2;
    let cy = b.origin.y + b.size.height / 2;
    return new Point(cx, cy);
  }

  get polygon(): Polygon {
    return this;
  }

  public rotatePolygon(degrees: number): Polygon {
    let vArr = this.vertices;
    let cp = this.centerPoint;
    let newVArr: Point[] = [];
    vArr.forEach((pt) => {
      newVArr.push(TrigonometryHelper.rotatePointByDegrees(pt, cp, degrees));
    });
    return new Polygon(newVArr);
  }

  public offsetPolygon(offsetX: number, offsetY: number): Polygon {
    let vertices = this.vertices.map((p) => new Point(p.x + offsetX, p.y + offsetY));
    return new Polygon(vertices);
  }

  get boundingRectangle(): Rectangle {
    return new Rectangle(this.bounds.origin, this.bounds.size);
  }

  static offsetPolygon(polygon: Polygon, offsetX: number, offsetY: number): Polygon {
    let vertices = polygon.vertices.map((p) => new Point(p.x + offsetX, p.y + offsetY));
    return new Polygon(vertices);
  }

  // GIVEN A POLYGON, CALCULATE THAT POLYGON IF IT EXPANDED OUTWARD BY spacing PIXELS...
  static expandPolygonByFixedAmt(poly: Polygon, spacing: number): Polygon {
    let pvArr = poly.vertices;
    // http://stackoverflow.com/a/11970006/796832
    // Accompanying Fiddle: http://jsfiddle.net/vqKvM/35/

    let newVertexArr: Point[] = [];
    let N: number = pvArr.length;
    let mi: number,
      mi1: number,
      li: number,
      li1: number,
      ri: number,
      ri1: number,
      si: number,
      si1: number,
      newPtX: number,
      newPtY: number;

    for (let i = 0; i < N; i++) {
      mi = (pvArr[(i + 1) % N].y - pvArr[i].y) / (pvArr[(i + 1) % N].x - pvArr[i].x);
      mi1 = (pvArr[(i + 2) % N].y - pvArr[(i + 1) % N].y) / (pvArr[(i + 2) % N].x - pvArr[(i + 1) % N].x);
      li = Math.sqrt(
        (pvArr[(i + 1) % N].x - pvArr[i].x) * (pvArr[(i + 1) % N].x - pvArr[i].x) +
          (pvArr[(i + 1) % N].y - pvArr[i].y) * (pvArr[(i + 1) % N].y - pvArr[i].y)
      );
      li1 = Math.sqrt(
        (pvArr[(i + 2) % N].x - pvArr[(i + 1) % N].x) * (pvArr[(i + 2) % N].x - pvArr[(i + 1) % N].x) +
          (pvArr[(i + 2) % N].y - pvArr[(i + 1) % N].y) * (pvArr[(i + 2) % N].y - pvArr[(i + 1) % N].y)
      );
      ri = pvArr[i].x + (spacing * (pvArr[(i + 1) % N].y - pvArr[i].y)) / li;
      ri1 = pvArr[(i + 1) % N].x + (spacing * (pvArr[(i + 2) % N].y - pvArr[(i + 1) % N].y)) / li1;
      si = pvArr[i].y - (spacing * (pvArr[(i + 1) % N].x - pvArr[i].x)) / li;
      si1 = pvArr[(i + 1) % N].y - (spacing * (pvArr[(i + 2) % N].x - pvArr[(i + 1) % N].x)) / li1;

      newPtX = (mi1 * ri1 - mi * ri + si - si1) / (mi1 - mi);
      newPtY = (mi * mi1 * (ri1 - ri) + mi1 * si - mi * si1) / (mi1 - mi);
      // Correction for vertical lines
      if (pvArr[(i + 1) % N].x - pvArr[i % N].x == 0) {
        newPtX =
          pvArr[(i + 1) % N].x +
          (spacing * (pvArr[(i + 1) % N].y - pvArr[i % N].y)) / Math.abs(pvArr[(i + 1) % N].y - pvArr[i % N].y);
        newPtY = mi1 * newPtX - mi1 * ri1 + si1;
      }

      if (pvArr[(i + 2) % N].x - pvArr[(i + 1) % N].x == 0) {
        newPtX =
          pvArr[(i + 2) % N].x +
          (spacing * (pvArr[(i + 2) % N].y - pvArr[(i + 1) % N].y)) /
            Math.abs(pvArr[(i + 2) % N].y - pvArr[(i + 1) % N].y);
        newPtY = mi * newPtX - mi * ri + si;
      }

      newVertexArr.push(new Point(newPtX, newPtY));
    }
    // TO KEEP NEW POLYGON CONSISTENT WITH HEX POLYGONS, MOVE THE LAST POINT TO THE BEGINING OF ARRAY....
    let pf = newVertexArr.pop();
    if (pf) {
      newVertexArr.unshift(pf); // MOVE THE LAST POINT TO THE START OF THE ARRAY...
    }

    return new Polygon(newVertexArr);
  }
}
