import { PickType } from '@nestjs/swagger';
import { LoadValidation } from '~modules/loads/validation/load.validation';

export class UpdateLoadBodyDto extends PickType(
  LoadValidation,
  ['name', 'payload', 'pickup_address', 'delivery_address', 'dimensions']
) {}
