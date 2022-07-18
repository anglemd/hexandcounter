import { Point } from '../core/point.class';
import { AbstractPolygon } from '../polygon/abstract-polygon.class';
import { Polygon } from '../polygon/polygon.class';
import { CubeCoord } from './cube-coord.class';
import { HexCoord } from './hex-coord.class';

export class Hexagon extends AbstractPolygon {
  private readonly _centerPoint;
  private readonly _hexSize;
  private readonly _isFlatTopped;
  private readonly _hexCoord: HexCoord;

  constructor(centerPoint: Point, size: number, isFlatTopped: boolean) {
    super();
    this._centerPoint = centerPoint;
    this._hexSize = size;
    this._isFlatTopped = isFlatTopped;
    this._hexCoord = Hexagon.pixelToHexCoord(this.centerPoint, this.isFlatTopped, this.hexSize);
    // CREATE VERTICES...
    // for( let i=0; i<6; i++){
    for (let i = 6; i > 0; i--) {
      let v = Hexagon.getHexCorner(i, this.centerPoint, this.hexSize, this.isFlatTopped);
      this._verticesArr.push(v);
    }
  }

  get polygon(): Polygon {
    if (this._polygon != undefined) return this._polygon;
    this._polygon = new Polygon(this._verticesArr);
    return this.polygon;
  }
  get isFlatTopped(): boolean {
    return this._isFlatTopped;
  }
  get isPointyTopped(): boolean {
    return !this.isFlatTopped;
  }
  get hexSize(): number {
    return this._hexSize;
  } // THE DISTANCE FROM CENTER POINT TO MID-EDGE.
  get centerPoint(): Point {
    return this._centerPoint;
  }

  // USE Polygon.offsetPolygon as alternative...
  public translate(point: Point): Hexagon {
    let newCenter = this._centerPoint.translate(point.x, point.y);
    return new Hexagon(newCenter, this._hexSize, this._isFlatTopped);
  }

  /**
   * Return a hexagon with the same center point, but resized...
   * @param newSize
   */
  public getResizedHex(newSize: number) {
    let hex = new Hexagon(this.centerPoint, newSize, this._isFlatTopped);
    return hex;
  }

  public getDistanceFrom(hex: Hexagon) {
    return Hexagon.getDistance(this, hex);
  }

  // PROVIDE METHOD OF CREATING HEXAGON BASED ON HEX COORDINATES...
  // https://www.redblobgames.com/grids/hexagons/#hex-to-pixel
  /**
   * Given the hexCoordinates, determine the center point and create a Hexagon.
   * @param hexCoord
   * @param hexSize
   * @param isFlatTopped
   * @param bShoveOdds
   */

  static createHexAtCoord(hexCoord: HexCoord, hexSize: number, isFlatTopped: boolean): Hexagon {
    let cx = 0; // center point x...
    let cy = 0; // center point y...
    if (isFlatTopped) {
      cx = ((hexSize * 3) / 2) * hexCoord.q;
      cy = hexSize * ((Math.sqrt(3) / 2) * hexCoord.q + Math.sqrt(3) * hexCoord.r);
    } else {
      cx = hexSize * (Math.sqrt(3) * hexCoord.q + (Math.sqrt(3) / 2) * hexCoord.r);
      cy = ((hexSize * 3) / 2) * hexCoord.r;
    }
    let hex = new Hexagon(new Point(cx, cy), hexSize, isFlatTopped);
    return hex;
  }

  /**
   * use the center point to figure out what my HexCoord should be
   * @param grid
   */
  public getHexCoord(): HexCoord {
    return Hexagon.pixelToHexCoord(this.centerPoint, this.isFlatTopped, this.hexSize);
  }

  public getNeighborHexCoordByDirection(direction: number): HexCoord {
    let hc: HexCoord = this._hexCoord;
    let nhc = hc.getNeighborByDirection(direction);
    return nhc;
  }

  // public getOffsetCoord( grid:HexGrid ):OffsetCoord{
  //   let hc = this.getHexCoord( grid );
  //   let oc:OffsetCoord = OffsetCoord.cube_to_oddr( HexCoord.axial_to_cube( hc ));
  //   return oc;
  // }

  /**
   * For the given center point, calculate the position of the hexagon corner at index i
   * Used during initialization to determine the 6 vertices for this hexagon.
   */
  static getHexCorner(vertexIndex: number, centerPt: Point, hexSize: number, isFlatTopped: boolean): Point {
    let angle_deg = 60 * vertexIndex;
    if (!isFlatTopped) angle_deg += 30;
    let angle_rad = (Math.PI / 180) * angle_deg;
    let x = centerPt.x + hexSize * Math.cos(angle_rad);
    let y = centerPt.y + hexSize * Math.sin(angle_rad);
    return new Point(x, y);
  }

  public getDirectionOfSideClosestToPoint(pt: Point): number {
    // RETURNS THE DIRECTION
    let dir = 0;
    let minDir = 0;
    let minDist = Number.MAX_SAFE_INTEGER; // MAKE LARGE, SO WE CAN COMPARE AND FIND SMALLEST DISTANCE TO SIDE MID POINT...

    for (dir = 0; dir < 6; dir++) {
      let side = this.getSide(dir);
      let centerOfLine = side.midPoint;
      let distToSide = pt.distance(centerOfLine);
      if (distToSide < minDist) {
        minDist = distToSide;
        minDir = dir;
      }
    }
    return minDir;
  }

  static pixelToHexCoord = (point: Point, isFlatTopped: boolean, hexSize: number): HexCoord => {
    if (isFlatTopped) {
      let hc: HexCoord = Hexagon.pixel_to_flat_hex(point, hexSize);
      return hc;
    } else {
      let hc: HexCoord = Hexagon.pixel_to_pointy_hex(point, hexSize);
      return hc;
    }
  };

  static pixel_to_pointy_hex(point: Point, hexSize: number): HexCoord {
    let q = ((Math.sqrt(3) / 3) * point.x - (1 / 3) * point.y) / hexSize;
    let r = ((2 / 3) * point.y) / hexSize;
    return Hexagon.hex_round(new HexCoord(q, r));
  }

  static pixel_to_flat_hex(point: Point, hexSize: number): HexCoord {
    let q = ((2 / 3) * point.x) / hexSize;
    let r = ((-1 / 3) * point.x + (Math.sqrt(3) / 3) * point.y) / hexSize;
    return Hexagon.hex_round(new HexCoord(q, r));
  }

  static axial_to_cube(hex: HexCoord) {
    let x = hex.q;
    let z = hex.r;
    let y = -x - z;
    return new CubeCoord(x, y, z);
  }

  static cube_to_axial(cube: CubeCoord): HexCoord {
    let q = cube.x;
    let r = cube.z;
    return new HexCoord(q, r);
  }

  static hex_round(fractionalHex: HexCoord): HexCoord {
    let fractionalCube: CubeCoord = Hexagon.axial_to_cube(fractionalHex);
    return Hexagon.cube_to_axial(Hexagon.cube_round(fractionalCube));
  }

  /**
   * Given a fractional cube, convert to an integer cube
   * Used to convert screen position to hex coordinate, for example.
   */
  static cube_round(cube: CubeCoord) {
    let rx = Math.round(cube.x);
    let ry = Math.round(cube.y);
    let rz = Math.round(cube.z);

    let x_diff = Math.abs(rx - cube.x);
    let y_diff = Math.abs(ry - cube.y);
    let z_diff = Math.abs(rz - cube.z);

    if (x_diff > y_diff && x_diff > z_diff) {
      rx = -ry - rz;
    } else if (y_diff > z_diff) {
      ry = -rx - rz;
    } else {
      rz = -rx - ry;
    }
    return new CubeCoord(rx, ry, rz);
  }

  // GET DISTANCE BETWEEN TWO HEXAGONS...
  static getDistance(a: Hexagon, b: Hexagon) {
    let aCoord: HexCoord = a.getHexCoord();
    let aCube = Hexagon.axial_to_cube(aCoord);
    let bCoord: HexCoord = b.getHexCoord();
    let bCube = Hexagon.axial_to_cube(bCoord);
    let aa = Math.abs(aCube.x - bCube.x) + Math.abs(aCube.y - bCube.y) + Math.abs(aCube.z - bCube.z);
    return aa / 2;
  }
} // end class
