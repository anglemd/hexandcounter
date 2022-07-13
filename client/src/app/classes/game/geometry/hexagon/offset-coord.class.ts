// Used by HexGrid object.
// Use OffsetCoord for rectangular maps of HexCoord (to get around the fact that HexCoord maps look trapezoidal)
// Could use a Point or a HexCoord, however, this class denotes that the coordinates have already been shifted by the HexGrid to adapt the HexCoord to a game map.

export class OffsetCoord {
  constructor(public col: number, public row: number) {}

  public toString(): string {
    return this.col + ', ' + this.row;
  }
} //end class
