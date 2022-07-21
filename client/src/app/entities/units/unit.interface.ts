import { FactionEnum } from 'src/app/entities/factions/faction.enum';
import { UnitSizeEnum } from 'src/app/entities/units/unit-size.enum';
import { UnitTypeEnum } from 'src/app/entities/units/unit-type.enum';
import { IUnitAppearanceJson } from './unit-appearance.interface';
import { IUnitSideJson } from './unit-side.interface';
import { UnitArmorTypeEnum } from './unit-symbol-type.enum';

export interface IUnitJson {
  _id?: string;
  markerId: string;
  maxSteps?: number;
  faction?: FactionEnum;
  unitSize?: UnitSizeEnum;
  unitType?: UnitTypeEnum;
  division?: string;
  name?: string;
  armorType?: UnitArmorTypeEnum;
  unitSides?: IUnitSideJson[];
  unitAppearance?: IUnitAppearanceJson;
  noRebuild?: boolean;
}
