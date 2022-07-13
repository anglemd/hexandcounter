import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IGameJson } from 'src/app/interfaces/game.interface';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
})
export class GameListComponent implements OnInit {
  // USED BY TEMPLATE TO DISPLAY LIST OF GAMES...
  public gameList$: Observable<IGameJson[]> | undefined;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameList$ = this.gameService.getGameListForUser$();
  }

  onClickGame(game: IGameJson) {
    console.log(game);
    this.gameService.gameGameById$(game._id || '').subscribe();
  }
}
