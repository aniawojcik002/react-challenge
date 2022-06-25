import { CategoryEntity } from '../db/Category';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto implements CategoryEntity {
  @ApiProperty({ type: String, description: 'Unikalny identyfikator' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: Number, description: 'Data utworzenia' })
  @IsNumber()
  @IsNotEmpty()
  createdAt: number;

  @ApiProperty({ type: String, description: 'Nazwa kategorii' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: 'Kolor kategorii' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Id wpisów do księgi połaczonych z tą kategorią',
  })
  @IsString({ each: true })
  ledgerIds: string[];

  @ApiProperty({ type: String, nullable: true, description: 'Id budżetu' })
  @IsString()
  budgetId: string | null;
}
