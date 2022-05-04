import { Injectable } from '@nestjs/common';

import { JwtTokensService } from '~modules/jwt-tokens/services/jwt-tokens.service';
import { RegisterDto } from '~modules/auth/dtos/register.dto';
import { UsersService } from '~modules/users/services/users.service';
import { LoginDto } from '~modules/auth/dtos/login.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtTokensService: JwtTokensService,
    private readonly _usersService: UsersService
  ) {}

  async register(registerDto: RegisterDto) {
    await this._usersService.checkIsEmailUsed(registerDto.email);
    await this._usersService.create(registerDto);
  }

  async login({ email, password }: LoginDto) {
    const user = await this._usersService.findByEmail(email);
    await this._usersService.verifyPassword(user, password);
    const token = await this._jwtTokensService.generateToken({ id: user.id });
    return { token };
  }

}
