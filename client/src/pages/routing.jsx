import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout } from 'ui';
import { WalletPage } from 'pages/Wallet.page';
import { BudgetPage } from './Budget.page';
import { NoMatchPage } from './NoMatch.page';

const routing = [
  {
    path: '/budget',
    component: BudgetPage,
    linkText: 'Budżet',
    menuOrder: 2,
  },
  {
    path: '/',
    component: WalletPage,
    linkText: 'Portfel',
    menuOrder: 1,
  },
  {
    path: '*',
    component: NoMatchPage,
    linkText: null,
  },
];

const Routing = () => (
  <Router>
    <Layout routing={routing}>
      <Switch>
        {routing.map((config) => (
          <Route
            key={config.path}
            path={config.path}
            component={config.component}
          />
        ))}
      </Switch>
    </Layout>
  </Router>
);
export default Routing;
