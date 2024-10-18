import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.schema';
import { ProfileDTO } from './user.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { LoginDTO, RegisterDTO } from 'src/authentication/auth.dto';
import { AuthService } from 'src/authentication/auth.service';
import { ProfileService } from './profile.service';
import { MessagesService } from './message.service';
import { Profile } from './profile.schema';

@Controller('api')
export class UserController {
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private messagesService: MessagesService,
  ) {}

  @Get('getProfile')
  @UseGuards(AuthGuard)
  public async findAll(): Promise<Profile[]> {
    try {
      return await this.profileService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Post('createProfile')
  @UseGuards(AuthGuard)
  public async add(@Body() userDTO: ProfileDTO): Promise<Profile> {
    try {
      return await this.profileService.create(userDTO);
    } catch (error) {
      throw error;
    }
  }

  @Put('updateProfile/:id')
  @UseGuards(AuthGuard)
  public async update(
    @Param('id') id: string,
    @Body() userDTO: ProfileDTO,
  ): Promise<Profile> {
    try {
      return await this.profileService.update(id, userDTO);
    } catch (error) {
      throw error;
    }
  }

  @Post('register')
  public async register(
    @Body() registerDto: RegisterDTO,
  ): Promise<{ message: string; result: User }> {
    try {
      const result = await this.authService.register(registerDto);
      return { message: 'success', result };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDTO): Promise<User> {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('viewMessages')
  @UseGuards(AuthGuard)
  async viewMessages(
    @Query('senderId') senderId: string,
    @Query('receiverId') receiverId: string,
  ) {
    return this.messagesService.getMessages(senderId, receiverId);
  }

  @Post('sendMessage')
  @UseGuards(AuthGuard)
  async sendMessage(
    @Body()
    messageData: {
      senderId: string;
      receiverId: string;
      message: string;
    },
  ) {
    const { senderId, receiverId, message } = messageData;
    return await this.messagesService.createMessage(
      senderId,
      receiverId,
      message,
    );
  }
}
