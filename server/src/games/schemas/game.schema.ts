import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type GameDocument = GameRecord & Document;

@Schema({ collection: 'games' })
export class GameRecord {
  @Prop({ type: SchemaTypes.ObjectId })
  _id?: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  users: Array<any>;
}

export const GameSchema = SchemaFactory.createForClass(GameRecord);
