import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApiResponse from './api-response';
import ApiResponseDetail from './api-response-detail';
import ApiResponseUpdate from './api-response-update';
import ApiResponseDeleteDialog from './api-response-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApiResponseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApiResponseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApiResponseDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApiResponse} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ApiResponseDeleteDialog} />
  </>
);

export default Routes;
