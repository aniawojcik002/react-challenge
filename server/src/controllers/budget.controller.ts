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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBudgetDto } from '../dto/create-budget.dto';
import { UpdateBudgetDto } from '../dto/update-budget.dto';
import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { initialBudgets, BudgetEntity } from '../db/Budget';
import { CategoryEntity } from '../db/Category';
import { LedgerEntity } from '../db/Ledger';

@ApiBadRequestResponse()
@ApiTags('Budget')
@Controller('budget')
export class BudgetController implements OnModuleInit {
  constructor(
    @InjectInMemoryDBService('budget')
    private readonly budgetService: InMemoryDBService<BudgetEntity>,
    @InjectInMemoryDBService('category')
    private readonly categoryService: InMemoryDBService<CategoryEntity>,
    @InjectInMemoryDBService('ledger')
    private readonly ledgerService: InMemoryDBService<LedgerEntity>,
  ) {}

  onModuleInit(): any {
    this.budgetService.records = initialBudgets;
  }

  @ApiOperation({
    summary: 'Tworzy nowy budżet',
  })
  @ApiCreatedResponse()
  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    const budget = this.budgetService.create({
      amountInCents: createBudgetDto.amountInCents,
      categoryId: createBudgetDto.categoryId,
      createdAt: Date.now(),
    });

    const category = this.categoryService.get(createBudgetDto.categoryId);
    this.categoryService.update({
      ...category,
      budgetId: budget.id,
    });
    return budget;
  }

  @ApiOperation({
    summary: 'Znajdź wszystkie utworzone budżety',
  })
  @ApiNoContentResponse()
  @ApiOkResponse()
  @Get()
  async findAll() {
    const budgets = this.budgetService.getAll();

    return budgets
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      .map((expense) => {
        const { amountInCents, categoryId } = expense;
        const category = this.categoryService.get(categoryId);

        const ledgers = this.ledgerService.query(
          (ledger) => ledger.categoryId === categoryId,
        );
        const currentSpending = ledgers.reduce(
          (acc, curr) => acc + Number(curr.amountInCents),
          0,
        );
        const currentSpendingPercent = Math.floor(
          (currentSpending / amountInCents) * 100 || 0,
        );

        return {
          ...expense,
          currentSpending,
          currentSpendingPercent,
          category: category || null,
        };
      });
  }

  @ApiOperation({
    summary: 'Znajdź jeden budżet',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Get(':id')
  findOne(@Param('id') id) {
    return this.budgetService.get(id);
  }

  @ApiOperation({
    summary: 'Edytuj budżet',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Patch(':id')
  update(@Param('id') id, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetService.update(updateBudgetDto);
  }

  @ApiOperation({
    summary: 'Usuń budżet',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id') id) {
    const category = this.categoryService.query(
      (category) => category.budgetId === id,
    );
    this.categoryService.updateMany(category);
    return this.budgetService.delete(id);
  }

  @ApiOperation({
    summary: 'Usuń wiele budżetów',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Delete('')
  removeMany(@Body() { ids }) {
    const categories = this.categoryService.getAll().map((cateogry) => {
      if (!ids.includes(cateogry.budgetId)) return cateogry;

      return {
        ...cateogry,
        budgetId: null,
      };
    });

    this.categoryService.updateMany(categories);
    this.budgetService.deleteMany(ids);
  }
}
