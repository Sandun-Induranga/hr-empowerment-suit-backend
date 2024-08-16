import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: CreateAuthDto) {
    return this.authService.login(authDto);
  }

  @Post('signup')
  async signUp(@Body() authDto: CreateAuthDto) {
    return this.authService.signUp(authDto);
  }
}
