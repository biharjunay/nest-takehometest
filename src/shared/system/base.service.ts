import { Injectable } from '@nestjs/common';
import { Model, Document, FilterQuery } from 'mongoose';

@Injectable()
export class BaseService<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async findById(id: string): Promise<T> {
    return await this.model.findById(id).exec();
  }

  async findOne(query: FilterQuery<T>): Promise<T> {
    return await this.model.findOne(query).exec();
  }

  async create(entity: Partial<T>): Promise<T> {
    const newEntity = new this.model(entity);
    return await newEntity.save();
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    await this.model.findByIdAndUpdate(id, entity).exec();
    return this.findOne({ _id: id });
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
