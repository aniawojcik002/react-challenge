import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { BudgetService } from './services/BudgetService';

const queryClient = new QueryClient();
BudgetService.findAll();
export function TableQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('http://localhost:4320/swagger/#/').then((res) => {
      console.log(res.json);
    }),
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
