import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPetInventory } from 'app/shared/model/pet-inventory.model';
import { getEntities as getPetInventories } from 'app/entities/pet-inventory/pet-inventory.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { ITag } from 'app/shared/model/tag.model';
import { getEntities as getTags } from 'app/entities/tag/tag.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pet.reducer';
import { IPet } from 'app/shared/model/pet.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPetUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PetUpdate = (props: IPetUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { petEntity, petInventories, categories, tags, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pet');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getPetInventories();
    props.getCategories();
    props.getTags();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...petEntity,
        ...values,
        inventory: petInventories.find(it => it.id.toString() === values.inventoryId.toString()),
        category: categories.find(it => it.id.toString() === values.categoryId.toString()),
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
          <h2 id="nemo1App.pet.home.createOrEditLabel" data-cy="PetCreateUpdateHeading">
            Create or edit a Pet
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : petEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pet-id">ID</Label>
                  <AvInput id="pet-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="pet-name">
                  Name
                </Label>
                <AvField
                  id="pet-name"
                  data-cy="name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="photoUrlsLabel" for="pet-photoUrls">
                  Photo Urls
                </Label>
                <AvField id="pet-photoUrls" data-cy="photoUrls" type="text" name="photoUrls" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="pet-status">
                  Status
                </Label>
                <AvField id="pet-status" data-cy="status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="additionalMetadataLabel" for="pet-additionalMetadata">
                  Additional Metadata
                </Label>
                <AvField id="pet-additionalMetadata" data-cy="additionalMetadata" type="text" name="additionalMetadata" />
              </AvGroup>
              <AvGroup>
                <Label id="fileLabel" for="pet-file">
                  File
                </Label>
                <AvField id="pet-file" data-cy="file" type="text" name="file" />
              </AvGroup>
              <AvGroup>
                <Label for="pet-inventory">Inventory</Label>
                <AvInput id="pet-inventory" data-cy="inventory" type="select" className="form-control" name="inventoryId">
                  <option value="" key="0" />
                  {petInventories
                    ? petInventories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="pet-category">Category</Label>
                <AvInput id="pet-category" data-cy="category" type="select" className="form-control" name="categoryId">
                  <option value="" key="0" />
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pet" replace color="info">
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
  petInventories: storeState.petInventory.entities,
  categories: storeState.category.entities,
  tags: storeState.tag.entities,
  petEntity: storeState.pet.entity,
  loading: storeState.pet.loading,
  updating: storeState.pet.updating,
  updateSuccess: storeState.pet.updateSuccess,
});

const mapDispatchToProps = {
  getPetInventories,
  getCategories,
  getTags,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PetUpdate);
