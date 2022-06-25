import { Controller, Get } from '@nestjs/common';
import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { BudgetEntity } from '../db/Budget';
import { CategoryEntity } from '../db/Category';
import { LedgerEntity } from '../db/Ledger';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('summary')
@ApiTags('Summary')
export class SummaryController {
  constructor(
    @InjectInMemoryDBService('budget')
    private readonly budgetService: InMemoryDBService<BudgetEntity>,
    @InjectInMemoryDBService('category')
    private readonly categoryService: InMemoryDBService<CategoryEntity>,
    @InjectInMemoryDBService('ledger')
    private readonly ledgerService: InMemoryDBService<LedgerEntity>,
  ) {}

  @Get()
  @ApiOperation({
    description:
      'Zwraca podsumowanie na temat wszystkich operacji wykonanych na portfelu',
    summary: 'Podsumowanie operacji',
  })
  findAll() {
    const incomeRecords = this.ledgerService
      .query((ledger) => ledger.mode === 'INCOME')
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

    const expenseRecords = this.ledgerService
      .query((ledger) => ledger.mode === 'EXPENSE')
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

    const incomeAmountInCents = incomeRecords.reduce(
      (acc, curr) => acc + curr.amountInCents,
      0,
    );
    const expenseAmountInCents = expenseRecords.reduce(
      (acc, curr) => acc + curr.amountInCents,
      0,
    );
    const categories = this.categoryService
      .getAll()
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

    const transformed = categories
      .map((category) => ({
        categoryName: category.name,
        categoryId: category.id,
        categoryColor: category.color,
        amountInCents: this.getLedgersCategoryId(category.id).reduce(
          (acc, curr) => acc + curr.amountInCents,
          0,
        ),
      }))
      .filter((s) => s.amountInCents > 0)
      .sort((a, b) => b.amountInCents - a.amountInCents);

    if (!transformed.length)
      return {
        incomeAmountInCents,
        expenseAmountInCents,
        balance: incomeAmountInCents - expenseAmountInCents,
        spending: [],
      };

    const topResults = transformed.slice(0, 3);
    const other = transformed.slice(3).reduce(
      (acc, curr) => {
        return {
          categoryName: 'inne',
          categoryId: 'other',
          categoryColor: 'grey',
          amountInCents: acc.amountInCents + curr.amountInCents,
        };
      },
      { amountInCents: 0 },
    );

    return {
      incomeAmountInCents,
      expenseAmountInCents,
      balance: incomeAmountInCents - expenseAmountInCents,
      spending: [...topResults, other].filter(
        ({ amountInCents }) => !!amountInCents,
      ),
    };
  }

  getLedgersCategoryId = (categoryId) =>
    this.ledgerService.query((ledger) => ledger.categoryId === categoryId);
}
