import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TrucksService } from '~modules/trucks/services/trucks.service';
import { JwtTokenGuard } from '~modules/jwt-tokens/guards/jwt-token.guard';
import { GetUser } from '~modules/users/decorators/get-user.decorator';
import { UserDoc } from '~modules/users/schemas/user.schema';
import { AddTruckDto } from '~modules/trucks/dtos/add-truck.dto';
import { UpdateTruckDto } from '~modules/trucks/dtos/update-truck.dto';
import { UserRolesGuard } from '~modules/users/guards/user-roles.guard';
import { UserRolesEnum } from '~modules/users/enums/user-roles.enum';
import { UserRole } from '~modules/users/decorators/roles.decorator';

@Controller('trucks')
@UseGuards(JwtTokenGuard, UserRolesGuard)
@UserRole(UserRolesEnum.DRIVER)
export class TrucksController {
  constructor(
    private readonly _trucksService: TrucksService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @GetUser() user: UserDoc
  ) {
    const trucks = await this._trucksService.getAll(user);
    return { trucks };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async add(
    @GetUser() user: UserDoc,
    @Body() addTruckDto: AddTruckDto
  ) {
    await this._trucksService.add(user, addTruckDto);
    return { message: 'Truck created successfully' };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(
    @GetUser() user: UserDoc,
    @Param('id') truckId: string
  ) {
    const truck = await this._trucksService.findByTruckId(user, truckId);
    return { truck };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @GetUser() user: UserDoc,
    @Param('id') truckId: string,
    @Body() updateTruckDto: UpdateTruckDto
  ) {
    const truck = await this._trucksService.findByTruckId(user, truckId);
    await this._trucksService.update(truck, updateTruckDto);
    return { message: 'Truck details changed successfully' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @GetUser() user: UserDoc,
    @Param('id') truckId: string
  ) {
    const truck = await this._trucksService.findByTruckId(user, truckId);
    await this._trucksService.delete(truck);
    return { message: 'Truck deleted successfully' };
  }

  @Post(':id/assign')
  @HttpCode(HttpStatus.OK)
  async assignTruck(
    @GetUser() user: UserDoc,
    @Param('id') truckId: string
  ) {
    const truck = await this._trucksService.findByTruckId(user, truckId);
    await this._trucksService.assignTruck(truck, user);
    return { message: 'Truck assigned successfully' };
  }

}
