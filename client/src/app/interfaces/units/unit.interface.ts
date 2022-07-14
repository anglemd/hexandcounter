import { FactionEnum } from 'src/app/enums/factions/faction.enum';
import { UnitSizeEnum } from 'src/app/enums/units/unit-size.enum';
import { UnitTypeEnum } from 'src/app/enums/units/unit-type.enum';
import { IUnitAppearanceJson } from './unit-appearance.interface';
import { IUnitSide } from './unit-side.interface';

export interface IUnitJson {
  markerId: string;
  steps?: number;
  faction?: FactionEnum;
  unitSize?: UnitSizeEnum;
  unitType?: UnitTypeEnum;
  division?: string;
  name?: string;
  unitSides?: IUnitSide[];
  unitAppearance?: IUnitAppearanceJson;
}
