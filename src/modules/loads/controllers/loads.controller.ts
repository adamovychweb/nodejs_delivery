import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';

import { JwtTokenGuard } from '~modules/jwt-tokens/guards/jwt-token.guard';
import { UserRolesGuard } from '~modules/users/guards/user-roles.guard';
import { LoadsService } from '~modules/loads/services/loads.service';
import { UserRolesEnum } from '~modules/users/enums/user-roles.enum';
import { UserDoc } from '~modules/users/schemas/user.schema';
import { GetUser } from '~modules/users/decorators/get-user.decorator';
import { AddLoadBodyDto } from '~modules/loads/dtos/add-load.body.dto';
import { UserRole } from '~modules/users/decorators/roles.decorator';
import { TrucksService } from '~modules/trucks/services/trucks.service';
import { GetManyQueryDto } from '~modules/loads/dtos/get-many.query.dto';
import { UpdateLoadBodyDto } from '~modules/loads/dtos/update-load.body.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Loads')
@Controller('loads')
@UseGuards(JwtTokenGuard, UserRolesGuard)
export class LoadsController {
  constructor(
    private readonly _loadsService: LoadsService,
    private readonly _trucksService: TrucksService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findManyLoads(
    @GetUser() user: UserDoc,
    @Query() query: GetManyQueryDto
  ) {
    const loads = await this._loadsService.findManyLoads(user, query);
    return { loads };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UserRole(UserRolesEnum.SHIPPER)
  async addLoad(
    @GetUser() user: UserDoc,
    @Body() addLoadBodyDto: AddLoadBodyDto
  ) {
    await this._loadsService.addLoad(user, addLoadBodyDto);
    return { message: 'Load created successfully' };
  }

  @Get('active')
  @HttpCode(HttpStatus.OK)
  @UserRole(UserRolesEnum.DRIVER)
  async getDriverActiveLoad(
    @GetUser() user: UserDoc
  ) {
    const activeLoad = await this._loadsService.getDriverActiveLoad(user);
    return { load: activeLoad };
  }

  @Patch('active/state')
  @HttpCode(HttpStatus.OK)
  @UserRole(UserRolesEnum.DRIVER)
  async iterateLoadState(
    @GetUser() user: UserDoc
  ) {
    const activeLoad = await this._loadsService.getDriverActiveLoad(user);
    const truck = await this._trucksService.findDriverLoadedTruck(user);
    const { message } = await this._loadsService.iterateLoadState(activeLoad, truck);
    return { message };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findLoadById(
    @GetUser() user: UserDoc,
    @Param('id') loadId: string
  ) {
    const load = await this._loadsService.findLoadById(user, loadId);
    return { load };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UserRole(UserRolesEnum.SHIPPER)
  async update(
    @GetUser() user: UserDoc,
    @Param('id') loadId: string,
    @Body() updateLoadBodyDto: UpdateLoadBodyDto
  ) {
    const load = await this._loadsService.findLoadById(user, loadId);
    await this._loadsService.updateLoad(load, updateLoadBodyDto);
    return { message: 'Load details changed successfully' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UserRole(UserRolesEnum.SHIPPER)
  async delete(
    @GetUser() user: UserDoc,
    @Param('id') loadId: string
  ) {
    const load = await this._loadsService.findLoadById(user, loadId);
    await this._loadsService.deleteLoad(load);
    return { message: 'Load deleted successfully' };
  }

  @Post(':id/post')
  @HttpCode(HttpStatus.OK)
  @UserRole(UserRolesEnum.SHIPPER)
  async postLoad(
    @GetUser() user: UserDoc,
    @Param('id') loadId: string
  ) {
    const load = await this._loadsService.findLoadById(user, loadId);
    return this._loadsService.postLoad(load);
  }

  @Get(':id/shipping_info')
  @HttpCode(HttpStatus.OK)
  @UserRole(UserRolesEnum.SHIPPER)
  async shippingInfo(
    @GetUser() user: UserDoc,
    @Param('id') loadId: string
  ) {
    const load = await this._loadsService.findLoadById(user, loadId);
    const truck = await this._trucksService.findLoadDriver(load);
    return { load, truck };
  }
}
