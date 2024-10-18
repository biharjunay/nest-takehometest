import { PartialType } from '@nestjs/swagger';
import { User } from './user.schema';

export class UserPayload extends PartialType(User) {
  public createdAt?: string;
  public updatedAt?: string;
}
