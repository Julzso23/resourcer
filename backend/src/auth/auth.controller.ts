import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'users/dtos/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<{token: string}> {
    return { token: await this.authService.register(userDto) };
  }

  @Public()
  @UseGuards(new LocalAuthGuard())
  @Post('login')
  async login(@Request() request): Promise<{token: string}> {
    return { token: await this.authService.login(request.user) };
  }
}
