import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { catchError, map, Observable } from 'rxjs';
import { IUnitJson } from 'src/app/interfaces/units/unit.interface';
import { UnitDesignerService } from 'src/app/services/design/unit-designer.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUnitModalComponent } from '../edit-unit-modal/edit-unit-modal.component';

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

  public foundUnits$: Observable<IUnitJson[]> | undefined;
  constructor(private unitService: UnitDesignerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.searchInputCtrl.setValue('SM.');
    this.search();
  }

  search() {
    const term = this.searchInputCtrl.value || '';
    this.foundUnits$ = this.unitService.findAllMatchingUnits$(term).pipe(
      catchError((err) => {
        return [];
      }),
      map((res) => {
        console.log(res);
        return res as Array<IUnitJson>;
      })
    );
  }

  editUnitJson(unitJson: IUnitJson) {
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
      this.unitService.saveUnitEdits$(unitJson._id, unitJson).subscribe((res) => {
        console.log(res);
        this.search();
      });
    }
  };
}
