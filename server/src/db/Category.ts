import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface CategoryEntity extends InMemoryDBEntity {
  createdAt: number;
  name: string;
  color: string;
  ledgerIds: string[];
  budgetId: string | null;
}
export const initialCategories: CategoryEntity[] = [
  {
    id: '1',
    name: 'Mieszkanie',
    color: '#beb1ff',
    budgetId: '1',
    ledgerIds: ['1'],
    createdAt: new Date(2022, 1, 1, 9, 10).valueOf(),
  },
  {
    id: '2',
    name: 'Transport',
    color: '#fdd900',
    budgetId: '2',
    ledgerIds: ['2', '3'],
    createdAt: new Date(2022, 1, 1, 9, 20).valueOf(),
  },
  {
    id: '3',
    name: 'Jedzenie',
    color: '#6fc2a7',
    budgetId: '3',
    ledgerIds: ['4', '5', '6'],
    createdAt: new Date(2022, 1, 1, 9, 30).valueOf(),
  },
  {
    id: '4',
    name: 'Opłaty',
    color: '#f7f600',
    budgetId: '4',
    ledgerIds: ['7', '8', '9'],
    createdAt: new Date(2022, 1, 1, 9, 40).valueOf(),
  },
  {
    id: '5',
    name: 'Ubezpieczenia',
    color: '#97e1ff',
    budgetId: null,
    ledgerIds: ['10'],
    createdAt: new Date(2022, 1, 1, 9, 50).valueOf(),
  },
  {
    id: '6',
    name: 'Inwestycje i oszczędności',
    color: '#006d7a',
    budgetId: '5',
    ledgerIds: ['11', '12'],
    createdAt: new Date(2022, 1, 1, 10, 10).valueOf(),
  },
  {
    id: '7',
    name: 'Wydatki prywatne',
    color: '#ff7b44',
    budgetId: '6',
    ledgerIds: ['13', '14'],
    createdAt: new Date(2022, 1, 1, 11, 10).valueOf(),
  },
  {
    id: '8',
    name: 'Różne',
    color: '#93ab8e',
    budgetId: '7',
    ledgerIds: ['15', '16'],
    createdAt: new Date(2022, 1, 1, 12, 10).valueOf(),
  },
];
