import { TruckInterface } from '~modules/trucks/interfaces/truck.interface';
import { TruckTypesEnum } from '~modules/trucks/enums/truck-types.enum';
import { IsEnum } from 'class-validator';

type TruckValidationInterface = Pick<TruckInterface, 'type'>

export class TruckValidation implements TruckValidationInterface {
  @IsEnum(TruckTypesEnum)
  type: TruckTypesEnum;
}
