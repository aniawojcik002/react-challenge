import React from 'react';

import { ActionHeader, Card } from 'ui';

export const LedgerWidget = () => {
  return (
    <Card
      title={
        <ActionHeader
          variant={'h1'}
          title="Portfel"
          renderActions={() => <></>}
        />
      }
    />
  );
};
