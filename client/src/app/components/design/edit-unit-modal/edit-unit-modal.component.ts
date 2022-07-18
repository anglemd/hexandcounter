import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FactionEnum } from 'src/app/entities/factions/faction.enum';
import { UnitSymbolEnum } from 'src/app/entities/units/unit-symbol.enum';

import { UnitTypeEnum } from 'src/app/entities/units/unit-type.enum';
import { IUnitJson } from 'src/app/entities/units/unit.interface';

@Component({
  selector: 'app-edit-unit-modal',
  templateUrl: './edit-unit-modal.component.html',
})
export class EditUnitModalComponent implements OnInit {
  public factionCtrl = new FormControl(''); // Unit faction...
  public nameCtrl = new FormControl('', { updateOn: 'blur' }); // Unit name...
  public typeCtrl = new FormControl(''); // Unit type...
  public divisionCtrl = new FormControl(''); // Division name
  public markerIdCtrl = new FormControl('', { updateOn: 'blur' }); // Marker ID
  public symbolCtrl = new FormControl('');
  ////
  public cloneJson: IUnitJson = { markerId: '' }; // THIS IS THE EDITABLE COPY...
  public factionTypes = Object.values(FactionEnum);
  public unitTypes = Object.values(UnitTypeEnum);
  public divisionNames: Array<string> = ['', '3.Pz', '4.Pz', '7.Pz', '10.Pz'];
  public symbolTypes = Object.values(UnitSymbolEnum);

  constructor(@Inject(MAT_DIALOG_DATA) public unitJson: IUnitJson) {
    // console.log(data);
    console.log(this.factionTypes);
  }

  ngOnInit(): void {
    this.cloneJson = JSON.parse(JSON.stringify(this.unitJson));
    //SET FACTION CONTROL TO VALUE IN JSON...
    this.factionCtrl.setValue(this?.cloneJson?.faction || '');

    // SET NAME CONTROL TO VALUE IN JSON...
    this.nameCtrl.setValue(this?.cloneJson?.name || '');

    // SET TYPE CONTROL TO VALUE IN JSON...
    this.typeCtrl.setValue(this?.cloneJson?.unitType || '');

    // SET MARKER ID VALUE...
    this.markerIdCtrl.setValue(this?.cloneJson?.markerId || '');

    if (!this.cloneJson.unitAppearance) this.cloneJson.unitAppearance = {};
    this.symbolCtrl.setValue(this?.cloneJson.unitAppearance?.unitSymbol || '');

    if (!this.cloneJson.unitSides) this.cloneJson.unitSides = [];
  }

  public onNameChange() {
    this.cloneJson.name = this.nameCtrl.value || '';
  }

  public onMarkerIdChange() {
    this.cloneJson.markerId = this.markerIdCtrl.value || '';
  }

  onChangeUnitProperty(prop: 'faction' | 'division' | 'unitType', newValue: string) {
    console.log(prop, newValue);
    if (prop == 'faction') {
      this.factionCtrl.setValue(newValue);
      this.cloneJson.faction = this.factionTypes.find((item) => item == newValue);
    } else if (prop == 'division') {
      this.divisionCtrl.setValue(newValue);
      this.cloneJson.division = this.divisionNames.find((item) => item == newValue);
    } else if (prop == 'unitType') {
      this.typeCtrl.setValue(newValue);
      this.cloneJson.unitType = this.unitTypes.find((item) => item == newValue);
    } else if (prop == 'unitSymbol' && this.cloneJson.unitAppearance) {
      this.cloneJson.unitAppearance.unitSymbol = this.symbolTypes.find((item) => item == newValue);
    }
  }

  unitProperty(prop: 'faction' | 'division' | 'unitType') {
    return this.cloneJson[prop];
  }
  unitApprearanceProperty(prop: 'unitSymbol') {
    if (!this.cloneJson.unitAppearance) return;
    return this.cloneJson.unitAppearance[prop];
  }

  get unitSides() {
    return this.cloneJson.unitSides?.length || 0;
  }

  set unitSides(cnt: number) {
    if (!this.cloneJson.unitSides) this.cloneJson.unitSides = []; //always have at least an empty array..
    if (cnt == 0) this.cloneJson.unitSides = [];
    if (cnt == 1) {
      let origSide = this.cloneJson.unitSides[0];
      if (!origSide) origSide = {};
      this.cloneJson.unitSides = [origSide];
    }
    if (cnt == 2) {
      let origSide = this.cloneJson.unitSides[0];
      let origSide2 = this.cloneJson.unitSides[1];
      if (!origSide) origSide = {};
      if (!origSide2) origSide2 = {};
      this.cloneJson.unitSides = [origSide, origSide2];
    }
  }
}
