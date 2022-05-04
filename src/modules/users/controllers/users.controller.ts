import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from '~modules/users/services/users.service';
import { GetUser } from '~modules/users/decorators/get-user.decorator';
import { ReadableUserSerializer } from '~modules/users/serializers/readable-user.serializer';
import { ChangePasswordDto } from '~modules/users/dtos/change-password.dto';
import { UserDoc } from '~modules/users/schemas/user.schema';
import { JwtTokenGuard } from '~modules/jwt-tokens/guards/jwt-token.guard';
import { UserRolesGuard } from '~modules/users/guards/user-roles.guard';

@Controller('users/me')
@UseGuards(JwtTokenGuard, UserRolesGuard)
export class UsersController {
  constructor(
    private readonly _usersService: UsersService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getInfo(
    @GetUser() user: UserDoc
  ) {
    return { user: new ReadableUserSerializer(user) };
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async delete(
    @GetUser() user: UserDoc
  ) {
    await this._usersService.delete(user);
    return { message: 'Success' };
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @GetUser() user: UserDoc,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    await this._usersService.changePassword(user, changePasswordDto);
    return { message: 'Success' };
  }
}
