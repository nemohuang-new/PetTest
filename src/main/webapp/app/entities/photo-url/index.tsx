import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PhotoUrl from './photo-url';
import PhotoUrlDetail from './photo-url-detail';
import PhotoUrlUpdate from './photo-url-update';
import PhotoUrlDeleteDialog from './photo-url-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PhotoUrlUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PhotoUrlUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PhotoUrlDetail} />
      <ErrorBoundaryRoute path={match.url} component={PhotoUrl} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PhotoUrlDeleteDialog} />
  </>
);

export default Routes;
