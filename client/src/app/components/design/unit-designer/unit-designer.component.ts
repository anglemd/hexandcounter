import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { catchError, map, Observable, take, share, Subscription } from 'rxjs';
import { UnitDesignerService } from 'src/app/services/design/unit-designer.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUnitModalComponent } from '../edit-unit-modal/edit-unit-modal.component';
import { IUnitJson } from 'src/app/entities/units/unit.interface';
import { UnitEditor } from 'src/app/entities/units/unit-editor/unit-editor.class';
import { LayoutService } from 'src/app/services/layout.service';
import { Size } from 'src/app/entities/geometry/core/size.class';

@Component({
  selector: 'app-unit-designer',
  templateUrl: './unit-designer.component.html',
})
export class UnitDesignerComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;

  searchInputCtrl = new FormControl('', {
    updateOn: 'change',
    validators: [],
  });

  public foundUnits$: Observable<UnitEditor[]> | undefined;

  public winHeight$: Observable<string>;

  constructor(
    private unitService: UnitDesignerService,
    private dialog: MatDialog,
    private layoutService: LayoutService
  ) {
    this.winHeight$ = layoutService.mainAreaSize$.pipe(
      map((size: Size) => {
        let ht = size.height;
        console.log(size);
        ht = ht - 180;
        return ht.toString() + 'px';
      })
    );
  }

  ngOnInit(): void {
    let term = window.localStorage.getItem('search') || '';
    this.searchInputCtrl.setValue(term);
    this.search();
  }

  onKeyDown(evt: KeyboardEvent) {
    if (evt.key == 'Enter') this.search();
  }

  search() {
    const term = this.searchInputCtrl.value || '(.)';
    window.localStorage.setItem('search', term);
    if (term == '(.)') window.localStorage.setItem('search', '');
    this.foundUnits$ = this.unitService.findAllMatchingUnits$(term);
  }

  createNewUnit() {
    let unit: IUnitJson = { markerId: 'SM.XX.XX.XX' };
    this.editUnitJson(unit);
  }

  editUnitJson(unitJson: IUnitJson, clone?: boolean) {
    if (clone) {
      unitJson = JSON.parse(JSON.stringify(unitJson));
      delete unitJson._id;
      console.log(unitJson);
    }
    let dialog = this.dialog.open(EditUnitModalComponent, {
      data: unitJson,
      width: '900px',
      disableClose: false,
      position: { top: '40px' },
    });
    dialog.afterClosed().subscribe(this.onEditUnitDialogClosed);
  }

  private onEditUnitDialogClosed = (unitJson: IUnitJson | null) => {
    if (!unitJson) return; //user closed dialog without saving...
    console.log(unitJson);
    //TODO: dave unit to database...
    if (unitJson._id) {
      // existing...
      this.unitService.saveUnitEdits$(unitJson._id, unitJson).subscribe((res) => {
        console.log(res);
        this.search();
      });
    } else {
      // new unit...
      console.log('NEW UNIT');
      console.log(unitJson);
      this.unitService.createNewUnit$(unitJson).subscribe((res) => {
        console.log(res);
        this.search();
      });
    }
  };
}
