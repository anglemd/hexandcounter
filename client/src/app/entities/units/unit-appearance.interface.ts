import { ColorEnum } from '../rendering/color.enum';
import { UnitSymbolEnum } from './unit-symbol.enum';

export interface IUnitAppearanceJson {
  bgColor?: ColorEnum; // TODO - use COLOR ENUM
  fgColor?: ColorEnum; // default to BLACK
  thinStripe?: ColorEnum;
  thickStripe?: ColorEnum;
  unitSymbol?: UnitSymbolEnum;
}
