import { ColorEnum } from '../../rendering/color.enum';
import { IUnitAppearanceJson } from '../unit-appearance.interface';
import { UnitSymbolEnum } from '../unit-symbol.enum';
import { UnitEditor } from './unit-editor.class';

export class UnitAppearanceEditor {
  private _json: IUnitAppearanceJson;

  constructor(private _parent: UnitEditor) {
    if (!this._parent.json.unitAppearance) this._parent.json.unitAppearance = {};
    this._json = this._parent.json.unitAppearance;
  }

  private syncJson() {
    if (this._json.unitSymbol == UnitSymbolEnum.UNKNOWN) {
      delete this._json.unitSymbol; // SET TO null
    }
  }

  get unitSymbol(): UnitSymbolEnum {
    return this._json.unitSymbol || UnitSymbolEnum.UNKNOWN;
  }

  set unitSymbol(newVal: string) {
    this._json.unitSymbol = UnitEditor.unitSymbolEnumStrings.find((item) => item == newVal);
    this.syncJson();
  }

  get bgColor(): ColorEnum {
    return this._json.bgColor || ColorEnum.WHITE;
  }

  set bgColor(newVal: string) {
    this._json.bgColor = UnitEditor.colorEnumStrings.find((item) => item == newVal);
  }

  get fgColor(): ColorEnum {
    return this._json.bgColor || ColorEnum.BLACK;
  }
  set fgColor(newVal: string) {
    this._json.fgColor = UnitEditor.colorEnumStrings.find((item) => item == newVal);
  }
}

/*

export interface IUnitAppearanceJson {
  bgColor?: ColorEnum; // TODO - use COLOR ENUM
  fgColor?: ColorEnum; // default to BLACK
  thinStripe?: ColorEnum;
  thickStripe?: ColorEnum;
  XX unitSymbol?: UnitSymbolEnum;
}

*/
