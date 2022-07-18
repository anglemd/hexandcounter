import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap, map, catchError, take } from 'rxjs/operators';
import { RouterService } from './router.service';
import { IGameJson } from '../entities/game/game.interface';
import { Game } from '../entities/game/game.class';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly _gameListUrl: string = '/api/games';

  private currentGame: Game | undefined;
  public currentGame$: Subject<Game | undefined> = new Subject();

  constructor(private httpClient: HttpClient, public router: RouterService) {}

  gameGameById$(gameId: string): Observable<Game> {
    // this.currentGame$.next(undefined);
    return this.httpClient.get(this._gameListUrl + '/' + gameId).pipe(
      take(1),
      catchError((err) => {
        this.router.navigateToLogin();
        return of(null);
      }),
      map((res) => {
        let json = res as IGameJson;
        return new Game(json);
      }),
      tap((game) => {
        this.currentGame = game;
        this.currentGame$.next(game);
      })
    );
  }

  getGameListForUser$(): Observable<IGameJson[]> {
    let req = this.httpClient.get(this._gameListUrl).pipe(
      take(1),
      catchError((err) => {
        this.router.navigateToLogin();
        return of([]);
      }),
      map((res) => {
        return res as IGameJson[];
      }),
      tap((res) => {
        // console.log(res);
      })
    );
    return req;
  }
}
