import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }
    
    return user;
  }

  async login(user: any) {
    const loggedUser =  await this.validateUser(user.email, user.password);
    console.log(loggedUser);
    const payload = { email: user.email, userId: loggedUser._id, employeeId: loggedUser.employee.employeeId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: loggedUser.role
    };
  }

  async signUp(authDto: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(authDto.password, 10);
    const dto = {
      ...authDto,
      password: hashedPassword
    }
    const user = await this.usersService.create(dto);
    return this.login(user);
  }
}
