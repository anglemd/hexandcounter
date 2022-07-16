import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { FactionEnum } from '../enums/faction.enum';
import { UnitSizeEnum } from '../enums/unit-size.enum';
import { UnitTypeEnum } from '../enums/unit-type.enum';
import { IUnitSideJson } from '../interfaces/unit-side.interface';
import { IUnitAppearanceJson } from '../interfaces/unit.appearance';
import { IUnitJson } from '../interfaces/unit.interface';

export type UnitDocument = UnitRecord & Document;

@Schema({ collection: 'units' })
export class UnitRecord implements IUnitJson {
  @Prop({ type: SchemaTypes.ObjectId })
  _id?: Types.ObjectId;

  @Prop()
  markerId: string;

  @Prop()
  maxSteps: number;

  @Prop()
  unitSize: UnitSizeEnum;

  @Prop()
  faction: FactionEnum;

  @Prop()
  unitType?: UnitTypeEnum;

  @Prop()
  division?: string;

  @Prop()
  name?: string;

  @Prop({ type: Array<IUnitSideJson> })
  unitSides?: IUnitSideJson[];

  @Prop({ type: Object })
  unitAppearance?: IUnitAppearanceJson;
}

export const UnitSchema = SchemaFactory.createForClass(UnitRecord);
