import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, Observable, tap } from 'rxjs';
import { Game } from 'src/app/classes/game/game.class';
import { GameService } from 'src/app/services/game.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
})
export class GameInfoComponent implements OnInit {
  public currentGame$: Observable<Game | undefined>;
  public bShowInfo = false;

  constructor(
    private gameService: GameService,
    private routerService: RouterService,
    private route: Router
  ) {
    this.currentGame$ = this.gameService.currentGame$;

    this.route.events
      .pipe(filter((evt) => evt instanceof NavigationStart))
      .subscribe((evt) => {
        let nse = evt as NavigationStart;
        if (nse.url && nse.url.startsWith('/game/')) {
          this.bShowInfo = true;
        } else {
          this.bShowInfo = false;
        }
      });
  }

  ngOnInit(): void {}

  navigateToGameList() {
    this.routerService.navigateToList();
  }
}
