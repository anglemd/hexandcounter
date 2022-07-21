import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { delay } from 'rxjs';
import { Size } from 'src/app/entities/geometry/core/size.class';
import { LayoutService } from 'src/app/services/layout.service';
import { RouterService } from 'src/app/services/router.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {
  @ViewChild('oToolbar', { static: true }) matToolbarRef: MatToolbar | undefined;

  constructor(
    private layoutService: LayoutService,
    private windowService: WindowService,
    private websocketService: WebsocketService
  ) {
    this.windowService.resize$.pipe(delay(50)).subscribe(this.initSize);
  }

  private initSize = () => {
    if (this.matToolbarRef) {
      this.layoutService.navBarHeight = this.matToolbarRef._elementRef.nativeElement.clientHeight;
    }
  };

  ngOnInit() {
    this.initSize();
  }
}
