import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ collection: 'profile' })
export class Profile {
  @Prop()
  public username: string;
  @Prop({ type: Object })
  public about: any;
  @Prop()
  public interest: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
