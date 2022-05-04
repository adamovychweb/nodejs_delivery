import { PickType } from '@nestjs/swagger';
import { TruckValidation } from '~modules/trucks/validation/truck.validation';

export class AddTruckDto extends PickType(TruckValidation, ['type']) {}
