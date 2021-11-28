import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './photo-url.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhotoUrlDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PhotoUrlDetail = (props: IPhotoUrlDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { photoUrlEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="photoUrlDetailsHeading">PhotoUrl</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{photoUrlEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{photoUrlEntity.name}</dd>
          <dt>
            <span id="value">Value</span>
          </dt>
          <dd>{photoUrlEntity.value}</dd>
        </dl>
        <Button tag={Link} to="/photo-url" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/photo-url/${photoUrlEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ photoUrl }: IRootState) => ({
  photoUrlEntity: photoUrl.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhotoUrlDetail);
