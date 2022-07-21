import { Injectable } from '@angular/core';
import { WindowService } from './window.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Size } from '../entities/geometry/core/size.class';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private mainAreaSizeBehSubj$: BehaviorSubject<Size> = new BehaviorSubject(new Size(0, 0));
  public mainAreaSize$: Observable<Size> = this.mainAreaSizeBehSubj$.asObservable();

  private _navBarHeight: number = 56;
  // private _mainPanelSize:Size = new Size(10,10);

  private _resizeSub: Subscription | null = null; // THIS WILL HOLD THE SUBSCRIPTION TO THE WINDOW SERVICE RESIZE EVENT...

  get navBarHeight(): number {
    return this._navBarHeight;
  }
  set navBarHeight(newHt: number) {
    // console.log(newHt );
    this._navBarHeight = newHt;
    this.calculateMainPanelSize();
  }

  get mainPanelSize(): Size {
    return this.mainAreaSizeBehSubj$.value;
  }

  constructor(private windowService: WindowService) {
    // this._resizeSub = windowService.resize$.subscribe(() => {
    //   // console.log('LAYOUT RESIZE', this.windowService.devicePixelRatio);
    //   this.calculateMainPanelSize();
    // });
  }

  private calculateMainPanelSize() {
    let winSize = this.windowService.windowSize;
    let mainPanelSize = new Size(winSize.width, winSize.height - this.navBarHeight);
    console.log('Main panel size: ', mainPanelSize);
    this.mainAreaSizeBehSubj$.next(mainPanelSize);
  }
}
