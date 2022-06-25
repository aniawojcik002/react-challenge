import { BudgetEntity } from '../db/Budget';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class UpdateBudgetDto implements BudgetEntity {
  @ApiProperty({ type: String, description: 'Unikalny identyfikator' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: Number, description: 'Nazwa kategorii' })
  @IsNumber()
  @IsNotEmpty()
  createdAt: number;

  @ApiProperty({
    minimum: 0,
    type: Number,
    description: 'Wartośc podana w jednostce frakcyjnej (grosze)',
  })
  @IsNumber()
  @Min(0)
  amountInCents: number;

  @ApiProperty({ type: String, description: 'Id połaczonej kategorii' })
  @IsString()
  categoryId: string;
}
