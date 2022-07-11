import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserRecord & Document;

@Schema({ collection: 'users' })
export class UserRecord {
  @Prop()
  _id?: string;

  @Prop()
  userName: string;

  @Prop()
  displayName: string;

  @Prop()
  email: string;

  @Prop()
  pw?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserRecord);
