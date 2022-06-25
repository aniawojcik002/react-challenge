import React from 'react';

import { ActionHeader, Card, NoContent, Page, Error } from 'ui';
import { cardHeaderClasses, Grid } from '@mui/material';
import { Button } from 'ui';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { BudgetService } from 'api';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Table } from 'ui';
import CircleIcon from '@mui/icons-material/Circle';
import { Money } from 'ui';
import { LocalizedDate } from 'ui';
import { Loader } from 'ui';
// import { useIsFetching } from 'react-query'
const queryClient = new QueryClient();

export const BudgetPage = () => {
  // fetch('http://localhost:4320/budget')
  // .then(response => console.log(response))

  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Twój Budżet"
            renderActions={() => (
              <Button
                variant="contained"
                size="small"
                color="primary"
                startIcon={<AddRoundedIcon fontSize="small"></AddRoundedIcon>}
              >
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}></Grid>
        </Grid>
        <QueryClientProvider client={queryClient}>
          <Example></Example>
        </QueryClientProvider>
      </Card>
    </Page>
  );
};
function Example() {
  const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
    axios.get('http://localhost:4320/budget').then((res) => res.data),
  );
  console.log(BudgetService.findAll());

  if (isLoading)
    return (
      <div
        style={{
          width: '100%',
          height: '100',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader/>
      </div>
    );

  if (error) return <Error/>;
  if(isFetching) return <NoContent/> 

  const headCells = [
    {
      id: 'name',
      label: 'Nazwa',
      renderCell: (row) => (
        <div>
          <CircleIcon
            fontSize="small"
            style={{
              color: `${data[row.id].category.color}`,
              paddingRight: '5px',
              verticalAlign: 'middle',
            }}
          ></CircleIcon>
          {data[row.id].category.name}
        </div>
      ),
    },
    {
      id: 'Planned spendings',
      label: 'Planowane wydatki',
      renderCell: (row) => <Money inCents={data[row.id].amountInCents}></Money>,
    },
    {
      id: 'Current spending',
      label: 'Obecna kwota',
      renderCell: (row) => (
        <Money inCents={data[row.id].currentSpending}></Money>
      ),
    },
    {
      id: 'Status',
      label: 'Status',
      renderCell: (row) => {
        if (data[row.id].currentSpending > data[row.id].amountInCents) {
          return 'Przekroczone';
        } else if (data[row.id].currentSpending < data[row.id].amountInCents) {
          return 'W normie';
        } else {
          return 'Wykorzystany';
        }
      },
    },
    {
      id: 'Date of spending',
      label: 'Data utworzenia',
      renderCell: (row) => (
        <LocalizedDate date={data[row.id].createdAt}></LocalizedDate>
      ),
    },
  ];
  const rows = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  const getUniqueId = (row) => {
    return data[row.id].id;
  };
  const deleteRecords = () => {
    
  };
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Table
          headCells={headCells}
          rows={rows}
          getUniqueId={getUniqueId}
          deleteRecords={deleteRecords}
        ></Table>
      </QueryClientProvider>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
