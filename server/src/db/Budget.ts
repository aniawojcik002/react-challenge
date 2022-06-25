import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface BudgetEntity extends InMemoryDBEntity {
  createdAt: number;
  amountInCents: number;
  categoryId: string;
}

export const initialBudgets: BudgetEntity[] = [
  {
    createdAt: new Date(2022, 0, 1, 10, 0).valueOf(),
    categoryId: '1',
    amountInCents: 75000,
    id: '1',
  },
  {
    createdAt: new Date(2022, 0, 1, 11, 0).valueOf(),
    categoryId: '2',
    amountInCents: 75000,
    id: '2',
  },
  {
    createdAt: new Date(2022, 0, 1, 12, 0).valueOf(),
    categoryId: '3',
    amountInCents: 125000,
    id: '3',
  },
  {
    createdAt: new Date(2022, 0, 1, 12, 10).valueOf(),
    categoryId: '4',
    amountInCents: 100000,
    id: '4',
  },
  {
    createdAt: new Date(2022, 0, 1, 12, 20).valueOf(),
    categoryId: '6',
    amountInCents: 100000,
    id: '5',
  },
  {
    createdAt: new Date(2022, 0, 1, 12, 30).valueOf(),
    categoryId: '7',
    amountInCents: 28000,
    id: '6',
  },
  {
    createdAt: new Date(2022, 0, 1, 12, 40).valueOf(),
    categoryId: '8',
    amountInCents: 10000,
    id: '7',
  },
];
