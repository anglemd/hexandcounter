import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  constructor(private winService: WindowService) {
    this.winService.resize$.subscribe();
  }

  ngOnInit(): void {}
}
