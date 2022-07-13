import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap, map, catchError, take } from 'rxjs/operators';
import { RouterService } from './router.service';
import { IGameJson } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly _gameListUrl: string = '/api/games';

  constructor(private httpClient: HttpClient, public router: RouterService) {}

  gameGameById$(gameId: string): Observable<IGameJson> {
    return this.httpClient.get(this._gameListUrl + '/' + gameId).pipe(
      take(1),
      catchError((err) => {
        this.router.navigateToLogin();
        return of(null);
      }),
      map((res) => {
        return res as IGameJson;
      }),
      tap((res) => {
        console.log(res);
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
        console.log(res);
      })
    );
    return req;
  }
}
