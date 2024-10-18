import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './profile.schema';
import { BaseService } from 'src/shared/system/base.service';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService extends BaseService<ProfileDocument> {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {
    super(profileModel);
  }
}
