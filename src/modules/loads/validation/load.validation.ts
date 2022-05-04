import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

import { LoadInterface } from '~modules/loads/interfaces/load.interface';
import { LoadDimensionsValidation } from '~modules/loads/validation/load-dimensions.validation';
import { Type } from 'class-transformer';

type LoadValidationInterface = Pick<LoadInterface,
  'name' | 'payload' | 'pickup_address' | 'delivery_address' | 'dimensions'>

export class LoadValidation implements LoadValidationInterface {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  payload: number;

  @IsString()
  @IsNotEmpty()
  pickup_address: string;

  @IsString()
  @IsNotEmpty()
  delivery_address: string;

  @ValidateNested()
  @Type(() => LoadDimensionsValidation)
  @IsNotEmpty()
  dimensions: LoadDimensionsValidation;
}
