import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnitEditor } from 'src/app/entities/units/unit-editor/unit-editor.class';
import { IUnitJson } from 'src/app/entities/units/unit.interface';

@Component({
  selector: 'app-edit-unit-modal',
  templateUrl: './edit-unit-modal.component.html',
})
export class EditUnitModalComponent implements OnInit {
  // TEXT INPUT BASED CONTROLS
  public nameCtrl = new FormControl('', { updateOn: 'blur' }); // Unit name...
  public markerIdCtrl = new FormControl('', { updateOn: 'blur' }); // Marker ID
  // ENUM BASED CONTROLS
  public factionCtrl = new FormControl(''); // Unit faction...
  public typeCtrl = new FormControl(''); // Unit type...
  public divisionCtrl = new FormControl(''); // Division name
  public symbolCtrl = new FormControl('');

  // CONTROLS FOR UNIT SIDES...
  public sideFormControls: Array<FormControl[]> = [[new FormControl('')], [new FormControl('')]];

  ////
  public cloneJson: IUnitJson; // THIS IS THE EDITABLE COPY...
  public UnitEditor = UnitEditor; // USED BY TEMPLATE FOR STATIC PROPERTIES...
  public unitEditor: UnitEditor;

  constructor(@Inject(MAT_DIALOG_DATA) public unitJson: IUnitJson) {
    this.unitEditor = new UnitEditor(unitJson);
    this.cloneJson = this.unitEditor.json;
    this.unitJson = JSON.parse(JSON.stringify(this.cloneJson)); // SAVE THE ORIGINAL (AFTER TWEAKING FOR EDITOR)...

    //SET CONTROL VALUES TO MATCH JSON...
    this.nameCtrl.setValue(this.unitEditor.name);
    this.markerIdCtrl.setValue(this.unitEditor.markerId);
    this.factionCtrl.setValue(this.unitEditor.faction);
    this.divisionCtrl.setValue(this.unitEditor.division);
    this.typeCtrl.setValue(this.unitEditor.unitType);
    this.symbolCtrl.setValue(this.unitEditor.unitAppearanceEditor.unitSymbol);
  }

  ngOnInit(): void {}

  public isDirty() {
    return JSON.stringify(this.unitJson) !== JSON.stringify(this.cloneJson);
  }

  public onTextInputBlur = (formControl: FormControl) => {
    if (formControl == this.nameCtrl) {
      this.unitEditor.name = formControl.value || '';
    } else if (formControl == this.markerIdCtrl) {
      this.unitEditor.markerId = formControl.value || '';
    }
  };

  onChangeUnitProperty = (formControl: FormControl, newValue: string) => {
    console.log(newValue);
    formControl.setValue(newValue);
    if (formControl == this.factionCtrl) {
      this.unitEditor.faction = newValue;
    } else if (formControl == this.divisionCtrl) {
      this.unitEditor.division = newValue;
    } else if (formControl == this.typeCtrl) {
      this.unitEditor.unitType = newValue;
    } else if (formControl == this.symbolCtrl) {
      this.unitEditor.unitAppearanceEditor.unitSymbol = newValue;
    }
  };
}
