import { Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { CategoryEntity, initialCategories } from '../db/Category';
import { initialBudgets, BudgetEntity } from '../db/Budget';
import { initialLedgers, LedgerEntity } from '../db/Ledger';

@ApiBadRequestResponse()
@ApiTags('Tests')
@Controller('tests')
export class TestsController {
  constructor(
    @InjectInMemoryDBService('budget')
    private readonly budgetService: InMemoryDBService<BudgetEntity>,
    @InjectInMemoryDBService('category')
    private readonly categoryService: InMemoryDBService<CategoryEntity>,
    @InjectInMemoryDBService('ledger')
    private readonly ledgerService: InMemoryDBService<LedgerEntity>,
  ) {}

  @Post('/setup')
  @ApiOperation({
    summary: 'Odświeża dane przechowywane w pamięci servera',
  })
  setup() {
    this.ledgerService.deleteMany(
      this.ledgerService.getAll().map(({ id }) => id),
    );
    this.budgetService.deleteMany(
      this.budgetService.getAll().map(({ id }) => id),
    );
    this.categoryService.deleteMany(
      this.categoryService.getAll().map(({ id }) => id),
    );
    this.ledgerService.records = initialLedgers;
    this.budgetService.records = initialBudgets;
    this.categoryService.records = initialCategories;
  }
}
