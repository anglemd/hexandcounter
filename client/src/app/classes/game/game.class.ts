import { IGameJson } from 'src/app/interfaces/game.interface';

export class Game {
  constructor(public json: IGameJson) {}

  public get name(): string {
    return this.json.name;
  }
}
