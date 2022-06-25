import { CategoryEntity } from '../db/Category';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto implements Partial<CategoryEntity> {
  @ApiProperty({ type: 'string', description: 'Nazwa kategorii' })
  @IsString()
  @IsNotEmpty()
  name;

  @ApiProperty({ type: 'string', description: 'Kolor kategorii' })
  @IsString()
  @IsNotEmpty()
  color;
}
