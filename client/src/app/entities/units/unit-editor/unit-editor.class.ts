import { FactionEnum } from '../../factions/faction.enum';
import { ColorEnum } from '../../rendering/color.enum';
import { UnitMovementTypesEnum } from '../unit-movement-type.enum';
import { IUnitSideJson } from '../unit-side.interface';
import { UnitSizeEnum } from '../unit-size.enum';
import { UnitSymbolEnum } from '../unit-symbol.enum';
import { UnitTypeEnum } from '../unit-type.enum';
import { IUnitJson } from '../unit.interface';
import { UnitAppearanceEditor } from './unit-appearance-editor.class';
import { UnitSideEditor } from './unit-side-editor.class';

export class UnitEditor {
  public static factionEnumStrings = Object.values(FactionEnum);
  public static unitSizeEnumStrings = Object.values(UnitSizeEnum);
  public static unitTypeEnumStrings = Object.values(UnitTypeEnum);
  public static unitMovementTypesEnumStrings = Object.values(UnitMovementTypesEnum);
  public static unitSymbolEnumStrings = Object.values(UnitSymbolEnum);
  public static colorEnumStrings = Object.values(ColorEnum);
  public static divisionNames: Array<string> = ['', '3.Pz', '4.Pz', '7.Pz', '10.Pz'];
  public json: IUnitJson;
  public sideEditors: UnitSideEditor[] = [];
  public unitAppearanceEditor: UnitAppearanceEditor;

  constructor(private _json: IUnitJson) {
    this.json = JSON.parse(JSON.stringify(_json));
    // if (!this.json.unitAppearance) this.json.unitAppearance = {};
    this.unitAppearanceEditor = new UnitAppearanceEditor(this);
    if (!this.json.unitSides) this.json.unitSides = [];
  }

  private syncSideEditors() {
    if (this.json.unitType == UnitTypeEnum.HQ) this.sideCount = 2;
    if (this.json.unitType == UnitTypeEnum.COMBAT_UNIT) this.sideCount = 2;
    if (this.json.unitType == UnitTypeEnum.ARTILLARY_UNIT) this.sideCount = 2;
    if (this.json.unitType == UnitTypeEnum.DIVISION_MARKER) this.sideCount = 0;
    if (this.json.unitType == UnitTypeEnum.SUPPLY_DUMP) this.sideCount = 1;
    if (this.json.unitType == UnitTypeEnum.GROUND_TRANSPORT) this.sideCount = 1;
  }

  public get markerId(): string {
    return this.json.markerId || '';
  }

  public set markerId(newVal: string) {
    this.json.markerId = newVal;
  }

  public get maxSteps(): number {
    if (!this.json.maxSteps) this.json.maxSteps = 1;
    return this.json.maxSteps;
  }

  public set maxSteps(newVal: number) {
    this.json.maxSteps = newVal;
  }

  public get faction(): FactionEnum {
    if (!this.json.faction) this.json.faction = FactionEnum.GE;
    return this.json.faction;
  }

  public set faction(newVal: string) {
    this.json.faction = UnitEditor.factionEnumStrings.find((item) => item == newVal);
  }

  public get unitSize(): UnitSizeEnum {
    if (!this.json.unitSize) this.json.unitSize = UnitSizeEnum.REGIMENT_III;
    return this.json.unitSize;
  }

  public set unitSize(newVal: string) {
    this.json.unitSize = UnitEditor.unitSizeEnumStrings.find((item) => item == newVal);
  }

  public get unitType(): UnitTypeEnum {
    if (!this.json.unitType) this.json.unitType = UnitTypeEnum.COMBAT_UNIT;
    return this.json.unitType;
  }

  public set unitType(newVal: string) {
    this.json.unitType = UnitEditor.unitTypeEnumStrings.find((item) => item == newVal);
    this.syncSideEditors();
  }

  public get division(): string {
    if (!this.json.division) this.json.division = UnitEditor.divisionNames[0];
    return this.json.division;
  }

  public set division(newVal: string) {
    this.json.division = UnitEditor.divisionNames.find((item) => item == newVal);
  }

  public get name(): string {
    return this.json.name || '';
  }

  public set name(newVal: string) {
    console.log('NEW NAME SET ' + newVal);
    this.json.name = newVal;
  }

  public get sidesJson(): IUnitSideJson[] {
    if (!this.json.unitSides) this.json.unitSides = [];
    return this.json.unitSides;
  }

  public get sideCount(): number {
    return this.sidesJson.length;
  }

  public set sideCount(cnt: number) {
    if (!this.json.unitSides) this.json.unitSides = []; //always have at least an empty array..
    if (cnt == 0) {
      this.json.unitSides = [];
      this.sideEditors = [];
    }
    if (cnt == 1) {
      let origSide = this.json.unitSides[0];
      if (!origSide) origSide = {};
      this.json.unitSides = [origSide];
      this.sideEditors = [new UnitSideEditor(0, this)];
    }
    if (cnt == 2) {
      let origSide = this.json.unitSides[0];
      let origSide2 = this.json.unitSides[1];
      if (!origSide) origSide = {};
      if (!origSide2) origSide2 = {};
      this.json.unitSides = [origSide, origSide2];
      this.sideEditors = [new UnitSideEditor(0, this), new UnitSideEditor(1, this)];
    }
  }

  // HAS THE RESULTING JSON BEEN EDITED COMPAIRED TO THE ORIGINAL JSON?
  get hasChanged(): boolean {
    return JSON.stringify(this._json) != JSON.stringify(this.json);
  }
}
