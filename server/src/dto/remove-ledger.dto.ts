import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveLedgerDto {
  @ApiProperty({ isArray: true, description: 'Unikalny identyfikator' })
  @IsString({ each: true })
  @IsNotEmpty()
  ids: string[];
}
