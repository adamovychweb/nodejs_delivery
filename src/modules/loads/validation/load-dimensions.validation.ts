import { LoadDimensionsInterface } from '~modules/loads/interfaces/load-dimensions.interface';
import { IsNumber } from 'class-validator';

export class LoadDimensionsValidation implements LoadDimensionsInterface {
  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  length: number;
}
