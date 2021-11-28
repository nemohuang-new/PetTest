import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PetInventory from './pet-inventory';
import PetInventoryDetail from './pet-inventory-detail';
import PetInventoryUpdate from './pet-inventory-update';
import PetInventoryDeleteDialog from './pet-inventory-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PetInventoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PetInventoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PetInventoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={PetInventory} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PetInventoryDeleteDialog} />
  </>
);

export default Routes;
