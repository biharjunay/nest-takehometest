import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/api/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { UserService } from 'src/models/api/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async register(registerDto: RegisterDTO): Promise<any> {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException("password didn't match");
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = new this.userModel({
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
    });

    try {
      await newUser.save();
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new Error(`Failed to register user: ${error.message}`);
    }
  }

  public async login(loginDto: LoginDTO): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userService.findOne({ email });
    if (!user) throw new UnauthorizedException('Email or password is invalid');
    console.log(password, user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, username: user.username };
    return { user, accessToken: await this.jwtService.signAsync(payload) };
  }
}
