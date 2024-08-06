import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ collection: 'messages' }) // Adjust collection name as per your MongoDB collection
export class Message {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  receiverId: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ default: false })
  readStatus: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
