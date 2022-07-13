export class Size {
  constructor(public width: number, public height: number) {}

  public toString(): string {
    return this.width + ', ' + this.height;
  }
}
