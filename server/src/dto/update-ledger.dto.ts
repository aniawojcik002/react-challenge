import { LedgerEntity } from '../db/Ledger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLedgerDto implements LedgerEntity {
  @ApiProperty({ type: Number, description: 'Unikalny identyfikator' })
  @IsString()
  id: string;

  @ApiProperty({ type: Number, description: 'Nazwa kategorii' })
  @IsNumber()
  @IsNotEmpty()
  createdAt: number;

  @ApiProperty({ type: String, description: 'Nazwa wpisu do księgi' })
  title: string;

  @ApiProperty({
    enum: ['INCOME', 'EXPENSE'],
    description: 'Typ wpisu do księgi',
  })
  @IsEnum(['INCOME', 'EXPENSE'])
  mode: 'INCOME' | 'EXPENSE';

  @ApiProperty({
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
}
