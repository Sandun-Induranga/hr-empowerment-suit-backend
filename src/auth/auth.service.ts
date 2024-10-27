import { Injectable } from '@nestjs/common';
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
    // if (user && bcrypt.compareSync(pass, user.password)) {
    //   const { password, ...result } = user;
      return user;
    // }
    // return null;
  }

  async login(user: any) {
    const loggedUser =  await this.validateUser(user.email, user.password);
    console.log(loggedUser);
    const payload = { email: user.email, userId: loggedUser._id, employeeId: loggedUser.employee.employeeId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(authDto: CreateAuthDto) {
    const hashedPassword = bcrypt.hashSync(authDto.password, 10);
    const user = await this.usersService.create({
      ...authDto,
      password: hashedPassword,
    });
    return this.login(user);
  }
}
