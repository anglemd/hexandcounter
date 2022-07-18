export class Point {
  constructor(public x: number, public y: number) {}

  public toString(): string {
    return '(' + this.x + ', ' + this.y + ')';
  }

  public distance(p2: Point): number {
    let dist: number = Math.sqrt(
      Math.pow(p2.x - this.x, 2) + Math.pow(p2.y - this.y, 2)
    );
    return dist;
  }

  public translate(xOffset: number, yOffset: number) {
    return new Point(this.x + xOffset, this.y + yOffset);
  }
}
