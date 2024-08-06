import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/authentication/auth.constants';
import { AuthService } from 'src/authentication/auth.service';
import { ProfileService } from './profile.service';
import { Profile, ProfileSchema } from './profile.schema';
import { MessagesService } from './message.service';
import { Message, MessageSchema } from './message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [UserService, AuthService, ProfileService, MessagesService],
  exports: [UserService, MongooseModule, ProfileService],
  controllers: [UserController],
})
export class UserModule {}
