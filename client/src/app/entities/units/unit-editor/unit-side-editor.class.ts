import { UnitMovementTypesEnum } from '../unit-movement-type.enum';
import { IUnitSideJson } from '../unit-side.interface';
import { UnitTypeEnum } from '../unit-type.enum';
import { UnitEditor } from './unit-editor.class';

export class UnitSideEditor {
  private _json: IUnitSideJson;
  //
  constructor(private _sideIndex: 0 | 1, private _parent: UnitEditor) {
    if (_parent.sideCount < _sideIndex + 1) this._parent.sideCount = this._sideIndex + 1;
    this._json = _parent.sidesJson[this._sideIndex];
  }

  public get combatStrength(): number {
    if (!this._json.combatStrength) this._json.combatStrength = 0;
    return this._json.combatStrength;
  }

  public set combatStrength(newVal: number) {
    this._json.combatStrength = newVal;
    if (this._sideIndex == 0 && this._parent.sideCount == 2 && this._parent.sideEditors[1]) {
      let flipSide = this._parent.sideEditors[1];
      // if (flipSide.combatStrength == 0) {
      flipSide.combatStrength = Math.round(newVal / 2); // AUTOMATICALLY MAKE SIDE 2 COMBAT STR HALF OF SIDE ONE...
      // }
    }
  }

  public get supplyCapacity(): number {
    if (!this._json.supplyCapacity) return 0;
    return this._json.supplyCapacity;
  }

  public set supplyCapacity(newVal: number) {
    this._json.supplyCapacity = newVal;
    if (this._sideIndex == 0 && this._parent.sideCount == 2 && this._parent.sideEditors[1]) {
      let flipSide = this._parent.sideEditors[1];
      flipSide.supplyCapacity = newVal; // AUTOMATICALLY MAKE SIDE 2 THE SAME...
    }
  }

  public get defendOnly(): boolean {
    if (!this._json.defendOnly) return false;
    return this._json.defendOnly;
  }

  public set defendOnly(newVal: boolean) {
    this._json.defendOnly = newVal;
    if (this._sideIndex == 0 && this._parent.sideCount == 2 && this._parent.sideEditors[1]) {
      let flipSide = this._parent.sideEditors[1];

      flipSide.defendOnly = newVal; // AUTOMATICALLY MAKE SIDE 2 THE SAME...
    }
  }

  public get actionRating(): number {
    if (!this._json.actionRating) this._json.actionRating = 0;
    return this._json.actionRating;
  }

  public set actionRating(newVal: number) {
    this._json.actionRating = newVal;
    if (this._sideIndex == 0 && this._parent.sideCount == 2 && this._parent.sideEditors[1]) {
      let flipSide = this._parent.sideEditors[1];
      if (flipSide.actionRating == 0) {
        flipSide.actionRating = newVal; // AUTOMATICALLY MAKE SIDE 2 SAME AS SIDE ONE...
      }
    }
  }

  public get movementPoints(): number {
    if (!this._json.movementPoints) this._json.movementPoints = 0;
    return this._json.movementPoints;
  }

  public set movementPoints(newVal: number) {
    this._json.movementPoints = newVal;
    if (this._sideIndex == 0 && this._parent.sideCount == 2 && this._parent.sideEditors[1]) {
      let flipSide = this._parent.sideEditors[1];
      if (flipSide.movementPoints == 0) {
        flipSide.movementPoints = newVal; // AUTOMATICALLY MAKE SIDE 2 SAME AS SIDE ONE...
      }
    }
  }

  public get barrageStrength(): number {
    if (!this._json.barrageStrength) this._json.barrageStrength = 0;
    return this._json.barrageStrength;
  }

  public set barrageStrength(newVal: number) {
    this._json.barrageStrength = newVal;
    if (this._sideIndex == 0 && this._parent.sideCount == 2 && this._parent.sideEditors[1]) {
      let flipSide = this._parent.sideEditors[1];
      if (flipSide.barrageStrength) {
        flipSide.barrageStrength = Math.round(newVal / 2); // AUTOMATICALLY MAKE SIDE 2 HALF OF SIDE ONE...
      }
    }
  }

  public get range(): number {
    if (!this._json.range) this._json.range = 0;
    return this._json.range;
  }

  public set range(newVal: number) {
    this._json.range = newVal;
    if (this._sideIndex == 0 && this._parent.sideCount == 2 && this._parent.sideEditors[1]) {
      let flipSide = this._parent.sideEditors[1];
      if (flipSide.range == 0) {
        flipSide.range = newVal; // AUTOMATICALLY MAKE SIDE 2 SAME AS SIDE ONE...
      }
    }
  }

  public get noRebuild(): boolean {
    return this._parent.noRebuild;
  }

  public set noRebuild(newVal: boolean) {
    this._parent.noRebuild = newVal;
    console.log(this._parent.json);
  }

  public get transportPoints(): number {
    if (!this._json.transportPoints) this._json.transportPoints = 0;
    return this._json.transportPoints;
  }

  public set transportPoints(newVal: number) {
    this._json.transportPoints = newVal;
    if (this._sideIndex == 0 && this._parent.sideCount == 2 && this._parent.sideEditors[1]) {
      let flipSide = this._parent.sideEditors[1];
      if (flipSide.transportPoints == 0) {
        flipSide.transportPoints = newVal; // AUTOMATICALLY MAKE SIDE 2 SAME AS SIDE ONE...
      }
    }
  }

  public get movementType(): UnitMovementTypesEnum {
    if (!this._json.movementType) this._json.movementType = UnitMovementTypesEnum.UNKNOWN;
    return this._json.movementType;
  }

  public set movementType(newVal: string) {
    console.log(newVal);
    this._json.movementType = UnitEditor.unitMovementTypesEnumStrings.find((item) => item == newVal);
    if (this._sideIndex == 0 && this._parent.sideCount == 2 && this._parent.sideEditors[1]) {
      let flipSide = this._parent.sideEditors[1];
      if (flipSide.movementType == UnitMovementTypesEnum.UNKNOWN) {
        flipSide.movementType = newVal; // AUTOMATICALLY MAKE SIDE 2 SAME AS SIDE ONE...
      }
    }
  }

  public get json(): IUnitSideJson {
    return JSON.parse(JSON.stringify(this._json));
  }

  public get showCombatStrength(): boolean {
    return this._parent.unitType == UnitTypeEnum.COMBAT_UNIT;
  }
  public get showActionRating(): boolean {
    return this._parent.unitType == UnitTypeEnum.COMBAT_UNIT || this._parent.unitType == UnitTypeEnum.ARTILLARY_UNIT;
  }

  public get showMovementRating(): boolean {
    let uType = this._parent.unitType;
    return (
      uType == UnitTypeEnum.COMBAT_UNIT ||
      uType == UnitTypeEnum.ARTILLARY_UNIT ||
      uType == UnitTypeEnum.GROUND_TRANSPORT ||
      uType == UnitTypeEnum.HQ
    );
  }

  public get showRange(): boolean {
    return this._parent.unitType == UnitTypeEnum.HQ || this._parent.unitType == UnitTypeEnum.ARTILLARY_UNIT;
  }

  public get showBarageRating(): boolean {
    return this._parent.unitType == UnitTypeEnum.ARTILLARY_UNIT;
  }

  public get showSupplyCapacity(): boolean {
    return this._parent.unitType == UnitTypeEnum.GROUND_TRANSPORT;
  }

  public toString(): string {
    let valueArr: string[] = [];
    if (this.showBarageRating) valueArr.push(this.barrageStrength.toString());
    if (this.showRange) valueArr.push(this.range.toString());
    if (this.defendOnly) {
      if (this.showCombatStrength) valueArr.push('(' + this.combatStrength.toString() + ')');
    } else {
      if (this.showCombatStrength) valueArr.push(this.combatStrength.toString());
    }
    if (this.showActionRating) valueArr.push(this.actionRating.toString() + (this.noRebuild ? '*' : ''));
    if (this.showSupplyCapacity) valueArr.push(this.supplyCapacity.toString());
    if (this.showMovementRating) valueArr.push(this.movementPoints.toString());
    if (this.showMovementRating) valueArr.push(this.movementType.toString());

    return valueArr.join('-');
  }
}

/*
  combatStrength?: number;
  actionRating?: number; //action rating
  movementPoints?: number;
  movementType?: UnitMovementTypesEnum;
  barrageStrength?: number;
  range?: number;
  transportPoints?: number;

  COMBAT_UNIT: 
combatStrength
actionRating
movementPoints
movementType

ARTILLARY_UNIT
barrageStrength?: number;
range
actionRating
movementPoints
movementType

TRANSPORT_TRUCK | TRANSPORT_WAGON
movementPoints
movementType
transportPoints?: number;

SUPPLY_DUMP
<none>

HQ
range
movementPoints
movementType

*/
