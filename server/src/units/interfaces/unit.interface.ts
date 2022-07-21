import { Types } from 'mongoose';
import { FactionEnum } from '../enums/faction.enum';
import { UnitSizeEnum } from '../enums/unit-size.enum';
import { UnitTypeEnum } from '../enums/unit-type.enum';
import { UnitArmorTypeEnum } from './unit-armor-type.interface';
import { IUnitSideJson } from './unit-side.interface';
import { IUnitAppearanceJson } from './unit.appearance';

export interface IUnitJson {
  _id: Types.ObjectId;
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
