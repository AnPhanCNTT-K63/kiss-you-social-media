import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Document, Model, Types } from 'mongoose';

@Injectable()
export class BaseService<T extends Document> {
  constructor(public readonly model: Model<T>) {}

  async getAll(options?: any) {
    try {
      return await this.model.find(options).exec();
    } catch (error) {
      throw new BadRequestException('Failed to retrieve');
    }
  }

  async createOne(payload: any): Promise<any> {
    try {
      return await this.model.create(payload);
    } catch (error) {
      throw new BadRequestException('Failed to create');
    }
  }

  async getOne(options?: any): Promise<any> {
    try {
      const result = await this.model
        .findOne({
          options,
        })
        .exec();

      return result;
    } catch (error) {
      throw new BadRequestException('Failed to find');
    }
  }

  async getById(_id: Types.ObjectId): Promise<any> {}
}
