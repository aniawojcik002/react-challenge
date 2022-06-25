import { BudgetEntity } from '../db/Budget';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateBudgetDto implements Partial<BudgetEntity> {
  @ApiProperty({
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
