import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LedgerEntity } from '../db/Ledger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateLedgerDto implements Partial<LedgerEntity> {
  @ApiProperty({
    enum: ['INCOME', 'EXPENSE'],
    description: 'Typ wpisu do księgi',
  })
  @IsEnum(['INCOME', 'EXPENSE'])
  mode: 'INCOME' | 'EXPENSE';

  @ApiProperty({
    minimum: 0,
    type: Number,
    description: 'Wartośc podana w jednostce frakcyjnej (grosze)',
  })
  @IsNumber()
  @Min(0)
  amountInCents: number;

  @ApiPropertyOptional({
    nullable: true,
    type: String,
    description: 'Id połaczonej kategorii',
  })
  @IsString()
  @IsOptional()
  categoryId: string | null;

  @ApiProperty({ description: 'Nazwa wpisu do księgi' })
  title: string;
}
