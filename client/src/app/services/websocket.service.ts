import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'; // configure in app.module.ts...
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  // Observables that other classes can use to track what is happening on the server...
  public onMessage$: Observable<string>;

  constructor(public socket: Socket) {
    this.onMessage$ = (socket.fromEvent('message') as Observable<string>).pipe(
      tap((msg: string) => {
        console.log('WS msg:', msg);
      })
    );

    this.onMessage$.subscribe((msg: string) => {
      this.socket.emit('message', msg + '- back to you');
    });

    // this.socket.on('message', (msg: any) => {
    // });
  }
}
