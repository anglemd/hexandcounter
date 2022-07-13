import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Game } from 'src/app/classes/game/game.class';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
  public game$: Observable<Game | undefined>;

  constructor(
    private route: ActivatedRoute, // EXPOSE paramMap SO WE CAN GET GAME ID FROM URL...
    private gameService: GameService
  ) {
    this.game$ = this.gameService.currentGame$;
  }

  ngOnInit(): void {
    this.game$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let gameId = params.get('id') || '';
        return this.gameService.gameGameById$(gameId);
      })
    );
  }
}
