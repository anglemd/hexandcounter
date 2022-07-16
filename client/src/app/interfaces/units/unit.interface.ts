import { FactionEnum } from 'src/app/enums/factions/faction.enum';
import { UnitSizeEnum } from 'src/app/enums/units/unit-size.enum';
import { UnitTypeEnum } from 'src/app/enums/units/unit-type.enum';
import { IUnitAppearanceJson } from './unit-appearance.interface';
import { IUnitSideJson } from './unit-side.interface';

export interface IUnitJson {
  _id?: string;
  markerId: string;
  maxSteps?: number;
  faction?: FactionEnum;
  unitSize?: UnitSizeEnum;
  unitType?: UnitTypeEnum;
  division?: string;
  name?: string;
  unitSides?: IUnitSideJson[];
  unitAppearance?: IUnitAppearanceJson;
}
