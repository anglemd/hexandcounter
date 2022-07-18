import { IGameJson } from 'src/app/entities/game/game.interface';

export class Game {
  constructor(public json: IGameJson) {}

  public get name(): string {
    return this.json.name;
  }
}
