import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  contactPerson: string;

  @IsNotEmpty()
  @IsString()
  contactPhone: string;

  @IsArray()
  @IsInt({ each: true })
  type: number[];

  @IsNotEmpty()
  @IsString()
  area: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  isChargeable: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  openDate: Date | null;

  @IsNumber()
  @IsOptional()
  openDuration: number | null;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsNotEmpty()
  @IsArray()
  @IsObject({ each: true })
  images: Record<string, any>[];
}
