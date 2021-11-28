import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './api-response.reducer';
import { IApiResponse } from 'app/shared/model/api-response.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApiResponseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApiResponseUpdate = (props: IApiResponseUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { apiResponseEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/api-response');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...apiResponseEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="nemo1App.apiResponse.home.createOrEditLabel" data-cy="ApiResponseCreateUpdateHeading">
            Create or edit a ApiResponse
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : apiResponseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="api-response-id">ID</Label>
                  <AvInput id="api-response-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="api-response-code">
                  Code
                </Label>
                <AvField id="api-response-code" data-cy="code" type="string" className="form-control" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="api-response-type">
                  Type
                </Label>
                <AvField id="api-response-type" data-cy="type" type="text" name="type" />
              </AvGroup>
              <AvGroup>
                <Label id="messageLabel" for="api-response-message">
                  Message
                </Label>
                <AvField id="api-response-message" data-cy="message" type="text" name="message" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/api-response" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  apiResponseEntity: storeState.apiResponse.entity,
  loading: storeState.apiResponse.loading,
  updating: storeState.apiResponse.updating,
  updateSuccess: storeState.apiResponse.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiResponseUpdate);
