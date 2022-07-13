import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { Point } from '../classes/game/geometry/core/point.class';
import { Size } from '../classes/game/geometry/core/size.class';

// declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  private _devicePixelRatio = window.devicePixelRatio;

  private _msThrottleMilliseconds: number = 1000 / 4;

  public windowSize: Size = new Size(0, 0); //TRACK BROWSER WINDOW SIZE....

  public resize$: Observable<Size>;

  public mouseMove$: Observable<Point> | undefined;
  public mouseUp$: Observable<Point> | undefined;
  public contextMenu$: Observable<Point> | undefined;
  public dblClick$: Observable<Point>;

  public mouseMoveEvt$: Observable<MouseEvent> = fromEvent(
    window,
    'mousemove'
  ) as Observable<MouseEvent>;
  public mouseDownEvt$: Observable<MouseEvent> = fromEvent(
    window,
    'mousedown'
  ) as Observable<MouseEvent>;
  public mouseUpEvt$: Observable<MouseEvent> = fromEvent(
    window,
    'mouseup'
  ) as Observable<MouseEvent>;
  public dblClickEvt$: Observable<MouseEvent> = fromEvent(
    window,
    'dblclick'
  ) as Observable<MouseEvent>;
  public contextMenuEvt$: Observable<MouseEvent> = fromEvent(
    window,
    'contextmenu'
  ) as Observable<MouseEvent>;
  public mouseWheelEvt$: Observable<MouseEvent> = fromEvent(
    window,
    'wheel'
  ) as Observable<MouseEvent>;
  public keyDownEvt$: Observable<KeyboardEvent> = fromEvent(
    window,
    'keydown'
  ) as Observable<KeyboardEvent>;
  public keyUpEvt$: Observable<KeyboardEvent> = fromEvent(
    window,
    'keyup'
  ) as Observable<KeyboardEvent>;

  constructor() {
    this.windowSize = new Size(window.innerWidth, window.innerHeight);

    this.resize$ = fromEvent(window, 'resize').pipe(
      map((evt: Event) => {
        this.windowSize = new Size(window.innerWidth, window.innerHeight);
        return this.windowSize;
      }),
      debounceTime(this._msThrottleMilliseconds),
      distinctUntilChanged(
        (prev: Size, curr: Size) =>
          prev.width == curr.width && prev.height == curr.height
      ),
      tap((s: Size) => {
        console.log(s);
      })
    );

    this.dblClick$ = fromEvent(window, 'dblclick').pipe(
      map((evt: Event) => {
        let mEvt: MouseEvent = evt as MouseEvent;
        let pt = new Point(mEvt.x, mEvt.y);
        return pt;
      })
    ); //end pipe...
  } // end constructor...

  public get devicePixelRatio(): number {
    return this._devicePixelRatio;
  }
}
