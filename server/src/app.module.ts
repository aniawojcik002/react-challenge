import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { CategoryController } from './controllers/category.controller';
import { BudgetController } from './controllers/budget.controller';
import { SummaryController } from './controllers/summary.controller';
import { LedgerController } from './controllers/ledger.controller';
import { TestsController } from './controllers/tests.controller';

@Module({
  imports: [
    InMemoryDBModule.forFeature('category'),
    InMemoryDBModule.forFeature('ledger'),
    InMemoryDBModule.forFeature('budget'),
  ],
  controllers: [
    CategoryController,
    BudgetController,
    SummaryController,
    LedgerController,
    TestsController,
  ],
})
export class AppModule {}
