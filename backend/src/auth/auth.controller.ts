import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../../dtos/createUser.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.guard';
import { AuthenticatedRequest } from './AuthenticatedRequest';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<{ token: string }> {
    return { token: await this.authService.register(userDto) };
  }

  @Public()
  @UseGuards(new LocalAuthGuard())
  @Post('login')
  @HttpCode(200)
  async login(
    @Request() request: AuthenticatedRequest,
  ): Promise<{ token: string }> {
    return { token: await this.authService.login(request.user) };
  }
}
