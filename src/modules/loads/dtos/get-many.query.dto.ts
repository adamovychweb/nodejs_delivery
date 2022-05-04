import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { LoadStatusEnum } from '~modules/loads/enums/load-status.enum';

export class GetManyQueryDto {
  @IsEnum(LoadStatusEnum)
  @IsOptional()
  readonly status: LoadStatusEnum;

  @Transform((offset) => Number(offset.value))
  @Min(0)
  @Max(50)
  @IsNumber()
  @IsOptional()
  readonly offset = 0;

  @Transform((limit) => Number(limit.value))
  @Min(0)
  @Max(50)
  @IsNumber()
  @IsOptional()
  readonly limit = 10;
}
