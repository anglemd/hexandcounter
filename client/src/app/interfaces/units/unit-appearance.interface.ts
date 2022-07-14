import { ColorEnum } from 'src/app/enums/rendering/color.enum';
import { UnitSymbolEnum } from 'src/app/enums/units/unit-symbol.enum';

export interface IUnitAppearanceJson {
  bgColor?: ColorEnum; // TODO - use COLOR ENUM
  fgColor?: ColorEnum; // default to BLACK
  thinStripe?: ColorEnum;
  thickStripe?: ColorEnum;
  unitSymbol?: UnitSymbolEnum;
}
