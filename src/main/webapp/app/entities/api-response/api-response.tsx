// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './api-response.reducer';
import { IApiResponse } from 'app/shared/model/api-response.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApiResponseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ApiResponse = (props: IApiResponseProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { apiResponseList, match, loading } = props;
  return (
    <div>
      <h2 id="api-response-heading" data-cy="ApiResponseHeading">
        Api Responses
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Api Response
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {apiResponseList && apiResponseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Type</th>
                <th>Message</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {apiResponseList.map((apiResponse, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${apiResponse.id}`} color="link" size="sm">
                      {apiResponse.id}
                    </Button>
                  </td>
                  <td>{apiResponse.code}</td>
                  <td>{apiResponse.type}</td>
                  <td>{apiResponse.message}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${apiResponse.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${apiResponse.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${apiResponse.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Api Responses found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ apiResponse }: IRootState) => ({
  apiResponseList: apiResponse.entities,
  loading: apiResponse.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiResponse);
