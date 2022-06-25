import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
} from '@nestjs/common';
import { CreateLedgerDto } from '../dto/create-ledger.dto';
import { UpdateLedgerDto } from '../dto/update-ledger.dto';
import { RemoveLedgerDto } from '../dto/remove-ledger.dto';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { initialLedgers, LedgerEntity } from '../db/Ledger';
import { CategoryEntity } from '../db/Category';

@ApiTags('Ledger')
@ApiBadRequestResponse()
@Controller('ledger')
export class LedgerController implements OnModuleInit {
  constructor(
    @InjectInMemoryDBService('ledger')
    private ledgerService: InMemoryDBService<LedgerEntity>,
    @InjectInMemoryDBService('category')
    private readonly categoryService: InMemoryDBService<CategoryEntity>,
  ) {}

  onModuleInit(): any {
    this.ledgerService.records = initialLedgers;
  }

  @ApiOperation({
    summary: 'Dodaj wpis do księgi głównej',
  })
  @ApiCreatedResponse()
  @Post()
  create(@Body() createLedgerDto: CreateLedgerDto) {
    return this.ledgerService.create({
      mode: createLedgerDto.mode,
      title: createLedgerDto.title,
      amountInCents: createLedgerDto.amountInCents,
      categoryId: createLedgerDto.categoryId || null,
      createdAt: Date.now(),
    });
  }

  @ApiOperation({
    summary: 'Znajdź wszystkie wpisy do księgi głównej',
  })
  @ApiNoContentResponse()
  @ApiOkResponse()
  @Get()
  findAll() {
    const categories = this.categoryService.getAll();
    return this.ledgerService
      .getAll()
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      .map((record) => {
        return {
          ...record,
          category: categories.find((c) => c.id === record.categoryId) || {
            name: 'Nieskategoryzowane',
            id: record.id + 'no-cat',
            color: 'lightgrey',
          },
        };
      });
  }

  @ApiOperation({
    summary: 'Znajdź wpis w księdze głównej',
  })
  @ApiParam({
    name: 'id',
    description: 'Unikalny identyfikator wpisu do księgi głównej',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Get(':id')
  findOne(@Param('id') id) {
    return this.ledgerService.get(id);
  }

  @ApiOperation({
    summary: 'Edytuj wpis w księdze głównej',
  })
  @ApiParam({
    name: 'id',
    description: 'Unikalny identyfikator wpisu do księgi głównej',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Patch(':id')
  update(@Param('id') id, @Body() updateLedgerDto: UpdateLedgerDto) {
    return this.ledgerService.update(updateLedgerDto);
  }

  @ApiOperation({
    summary: 'Usuń wpis z księgi głównej',
  })
  @ApiParam({
    name: 'id',
    description: 'Unikalny identyfikator wpisu do księgi głównej',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id') id) {
    return this.ledgerService.delete(id);
  }

  @ApiOperation({
    summary: 'Usuń wiele wpisów z księgi głównej',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Delete()
  removeMany(@Body() { ids }: RemoveLedgerDto) {
    return this.ledgerService.deleteMany(ids);
  }
}
