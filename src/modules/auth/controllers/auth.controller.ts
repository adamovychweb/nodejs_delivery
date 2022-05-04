import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from '~modules/auth/services/auth.service';
import { RegisterDto } from '~modules/auth/dtos/register.dto';
import { LoginDto } from '~modules/auth/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() registerDto: RegisterDto
  ) {
    await this._authService.register(registerDto);
    return { message: 'Profile created successfully' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto
  ) {
    const { token } = await this._authService.login(loginDto);
    return { jwt_token: token };
  }

}
