import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createMessage(
    senderId: string,
    receiverId: string,
    message: string,
  ): Promise<Message> {
    const newMessage = new this.messageModel({ senderId, receiverId, message });
    return newMessage.save();
  }

  async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
    return this.messageModel
      .find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .exec();
  }
}
