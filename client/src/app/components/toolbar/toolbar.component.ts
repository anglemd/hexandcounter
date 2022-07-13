import { Component, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { delay } from 'rxjs';
import { Size } from 'src/app/classes/game/geometry/core/size.class';
import { LayoutService } from 'src/app/services/layout.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @ViewChild('oToolbar', { static: true }) matToolbarRef:
    | MatToolbar
    | undefined;

  constructor(
    private layoutService: LayoutService,
    private windowService: WindowService
  ) {
    this.windowService.resize$.pipe(delay(50)).subscribe(() => {
      // LISTEN TO WINDOW RESIZE EVENTS SO WE CAN CHECK OUR SIZE AND NOTIFY THE LAYOUT SERVICE...
      if (this.matToolbarRef) {
        // console.log(this.matToolbarRef._elementRef.nativeElement.clientHeight);
        this.layoutService.navBarHeight =
          this.matToolbarRef._elementRef.nativeElement.clientHeight;
      }
    });
  }
}
