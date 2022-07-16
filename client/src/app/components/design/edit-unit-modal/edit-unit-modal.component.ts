import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FactionEnum } from 'src/app/enums/factions/faction.enum';
import { IUnitJson } from 'src/app/interfaces/units/unit.interface';

@Component({
  selector: 'app-edit-unit-modal',
  templateUrl: './edit-unit-modal.component.html',
})
export class EditUnitModalComponent implements OnInit {
  public factionCtrl = new FormControl('');
  public cloneJson: IUnitJson = { markerId: '' };
  public factionTypes = Object.values(FactionEnum);

  constructor(@Inject(MAT_DIALOG_DATA) public unitJson: IUnitJson) {
    // console.log(data);
    console.log(this.factionTypes);
  }

  ngOnInit(): void {
    this.cloneJson = JSON.parse(JSON.stringify(this.unitJson));
    //SET FACTION CONTROL TO VALUE IN JSON...
    this.factionCtrl.setValue(this?.cloneJson?.faction || '');
    this.factionCtrl.valueChanges.subscribe((newVal) => {
      // let enum:FactionEnum =  (newVal) as keyof typeof FactionEnum;
      this.cloneJson.faction = this.factionTypes.find((item) => item == newVal);
      console.log(this.cloneJson);
    });
  }
}
