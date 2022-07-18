//import { Point } from "src/app/core/classes/point.class";

// AXIAL COORDINATES FOR A HEXAGON (does not factor in offsets (see OffsetCoords), row/column shifting, or hex numbering systems.)

export class HexCoord {
  constructor(public q: number, public r: number) {}

  public getNeighborByDirection(direction: number) {
    return this.hex_neighbor(this, direction);
  }

  public toString(): string {
    return this.q + ', ' + this.r;
  }

  static axial_directions = [
    new HexCoord(+1, 0),
    new HexCoord(+1, -1),
    new HexCoord(0, -1),
    new HexCoord(-1, 0),
    new HexCoord(-1, +1),
    new HexCoord(0, +1),
  ];

  private hex_neighbor(hex: HexCoord, direction: number): HexCoord {
    direction = direction % 6; // use modulus so directon 'wraps', e.g. direction:6==direction:0....
    let shiftAmount = HexCoord.axial_directions[direction];
    return new HexCoord(hex.q + shiftAmount.q, hex.r + shiftAmount.r);
  }
}
