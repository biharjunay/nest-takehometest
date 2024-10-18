import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  public username: string;
  @Prop({ required: true, lowercase: true, unique: true })
  public email: string;
  @Prop({ required: true })
  public password: string;
  @Prop()
  public address: string;
  @Prop()
  public interest: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
