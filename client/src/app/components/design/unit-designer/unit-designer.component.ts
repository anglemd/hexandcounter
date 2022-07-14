import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit-designer',
  templateUrl: './unit-designer.component.html',
})
export class UnitDesignerComponent implements OnInit {
  searchInputCtrl = new FormControl('', {
    updateOn: 'change',
    validators: [],
  });

  constructor() {}

  ngOnInit(): void {}
}
