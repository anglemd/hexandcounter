import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap, map, catchError, take } from 'rxjs/operators';
import { RouterService } from './router.service';
import { IUserJson } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
// THE USER SERVICE PULLS IN ACTIVE USER DATA FROM THE SERVER, BUT WHEN A GAME LOADS, ALL RELEVENT USERS ARE CREATED.
// THUS, _activeUser ISN'T KNOWN UNTIL ALL USERS HAVE LOADED, BUT THE activeUserId IS KNOWN EARLY ON.
export class AuthService {
  private readonly _loginUrl: string = '/api/auth/login';
  private readonly _userUrl: string = 'api/auth/validate';
  private _notLoggedIn: string = 'not logged in';

  private _sessionToken: string | null = null;
  private sessionToken$: Observable<string | null> | null = null;

  public userNameSubject$: BehaviorSubject<string> = new BehaviorSubject(
    this._notLoggedIn
  );

  constructor(private httpClient: HttpClient, public router: RouterService) {
    this.userNameSubject$.next(this._notLoggedIn);
  }

  public login(user: string, pass: string): Observable<string | null> {
    localStorage.clear();
    return this.getSessionToken$(user, pass);
  }

  public logout() {
    localStorage.clear();
    this.userNameSubject$.next(this._notLoggedIn);
    this.router.navigateToLogin();
    this.getUser$().subscribe();
  }

  public get sessionToken(): string | null {
    const tok = localStorage.getItem('id_token');
    return tok;
  }

  private getSessionToken$(un: string, pw: string): Observable<string | null> {
    if (this.sessionToken) return of(this._sessionToken); // return value if we have it.
    if (this.sessionToken$) {
      return this.sessionToken$;
    } // return observable if work in progress

    this.sessionToken$ = this.httpClient
      .post<any>(this._loginUrl, {
        username: window.btoa(un), //'david.gonzalez@anglemd.com',
        password: window.btoa(pw), //'test',
      })
      .pipe(
        take(1),
        catchError((err) => {
          console.log(err);
          localStorage.clear();
          return of({ access_token: this._notLoggedIn });
        }),
        tap((res: { access_token: string }) => {
          this.sessionToken$ = null; //RESET NOW THAT THE FETCH IS DONE...
          localStorage.setItem('id_token', res.access_token);
          this.router.navigateToList();
        }),
        map((res: { access_token: string }) => {
          if (res.access_token) {
            // console.log('========= SESSION TOKEN ===============');
            // console.log(res.access_token);
          } else {
            console.log('=== NO SESSION TOKEN AVAIL ===');
          }
          return res.access_token;
        })
      );
    return this.sessionToken$;
  }

  public getUser$(): Observable<IUserJson | null> {
    return this.httpClient.post(this._userUrl, {}).pipe(
      catchError((err) => {
        // console.log(err);
        this.userNameSubject$.next(this._notLoggedIn);
        return of(null);
      }),
      map((res: any) => {
        // console.log(res);
        if (!res) return null;
        let user: IUserJson = res as IUserJson;
        // console.log(user.userName + ' ' + user.email);
        if (user && user.userName && user.email) {
          this.userNameSubject$.next(user.email);
          return user;
        } else {
          this.userNameSubject$.next(this._notLoggedIn);
        }
        return null;
      })
    );
  }

  // USED BY auth-guard...
  public isValidUser$(): Observable<boolean> {
    return this.getUser$().pipe(
      map((res: IUserJson | null) => {
        // console.log(res);
        let user: IUserJson = res as IUserJson;
        if (user && user.userName && user.email) {
          return true;
        }
        return false;
      })
    );
  }
}
