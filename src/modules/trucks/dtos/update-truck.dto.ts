import { PickType } from '@nestjs/swagger';
import { TruckValidation } from '~modules/trucks/validation/truck.validation';

export class UpdateTruckDto extends PickType(TruckValidation, ['type']) {}
