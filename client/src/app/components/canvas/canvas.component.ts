import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { interval, Subscription, asyncScheduler } from 'rxjs';
import { throttle, throttleTime, tap } from 'rxjs/operators';
import { GameService } from 'src/app/services/game.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  // Get reference to the canvas element in the DOM...
  @ViewChild('canvasEl', { static: true }) canvasEl: ElementRef | undefined;

  constructor(
    private windowService: WindowService,
    private gameService: GameService
  ) {}

  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
}
