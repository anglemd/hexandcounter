import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FactionEnum } from 'src/app/enums/factions/faction.enum';
import { UnitTypeEnum } from 'src/app/enums/units/unit-type.enum';
import { IUnitJson } from 'src/app/interfaces/units/unit.interface';

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
  ////
  public cloneJson: IUnitJson = { markerId: '' }; // THIS IS THE EDITABLE COPY...
  public factionTypes = Object.values(FactionEnum);
  public unitTypes = Object.values(UnitTypeEnum);
  public divisionNames: Array<string> = ['', '3.Pz', '4.Pz', '7.Pz', '10.Pz'];

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
  }

  public onFactionChange() {
    this.cloneJson.faction = this.factionTypes.find((item) => item == this.factionCtrl.value);
  }

  public onNameChange() {
    this.cloneJson.name = this.nameCtrl.value || '';
  }

  public onMarkerIdChange() {
    this.cloneJson.markerId = this.markerIdCtrl.value || '';
  }

  public onTypeChange(newVal: string) {
    this.typeCtrl.setValue(newVal);
    console.log(this.typeCtrl.value);
    this.cloneJson.unitType = this.unitTypes.find((item) => item == this.typeCtrl.value);
    console.log(this.cloneJson);
  }

  public onDivisionChange(newVal: string) {
    this.divisionCtrl.setValue(newVal);
    // console.log(this.divisionCtrl.value);
    this.cloneJson.division = this.divisionCtrl.value || '';
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
    }
  }

  unitProperty(prop: 'faction' | 'division' | 'unitType') {
    return this.cloneJson[prop];
  }
}
