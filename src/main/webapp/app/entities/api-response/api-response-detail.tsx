import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './api-response.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApiResponseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApiResponseDetail = (props: IApiResponseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { apiResponseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="apiResponseDetailsHeading">ApiResponse</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{apiResponseEntity.id}</dd>
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{apiResponseEntity.code}</dd>
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{apiResponseEntity.type}</dd>
          <dt>
            <span id="message">Message</span>
          </dt>
          <dd>{apiResponseEntity.message}</dd>
        </dl>
        <Button tag={Link} to="/api-response" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/api-response/${apiResponseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ apiResponse }: IRootState) => ({
  apiResponseEntity: apiResponse.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiResponseDetail);
