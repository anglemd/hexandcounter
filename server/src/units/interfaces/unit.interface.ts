import { Types } from 'mongoose';
import { FactionEnum } from '../enums/faction.enum';
import { UnitSizeEnum } from '../enums/unit-size.enum';
import { UnitTypeEnum } from '../enums/unit-type.enum';
import { IUnitSideJson } from './unit-side.interface';
import { IUnitAppearanceJson } from './unit.appearance';

export interface IUnitJson {
  _id?: Types.ObjectId;
  markerId: string;
  maxSteps?: number;
  unitSize?: UnitSizeEnum;
  faction?: FactionEnum;
  unitType?: UnitTypeEnum;
  division?: string;
  name?: string;
  unitSides?: IUnitSideJson[];
  unitAppearance?: IUnitAppearanceJson;
}
