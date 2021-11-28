import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPetInventory, defaultValue } from 'app/shared/model/pet-inventory.model';

export const ACTION_TYPES = {
  FETCH_PETINVENTORY_LIST: 'petInventory/FETCH_PETINVENTORY_LIST',
  FETCH_PETINVENTORY: 'petInventory/FETCH_PETINVENTORY',
  CREATE_PETINVENTORY: 'petInventory/CREATE_PETINVENTORY',
  UPDATE_PETINVENTORY: 'petInventory/UPDATE_PETINVENTORY',
  PARTIAL_UPDATE_PETINVENTORY: 'petInventory/PARTIAL_UPDATE_PETINVENTORY',
  DELETE_PETINVENTORY: 'petInventory/DELETE_PETINVENTORY',
  RESET: 'petInventory/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPetInventory>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PetInventoryState = Readonly<typeof initialState>;

// Reducer

export default (state: PetInventoryState = initialState, action): PetInventoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PETINVENTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PETINVENTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PETINVENTORY):
    case REQUEST(ACTION_TYPES.UPDATE_PETINVENTORY):
    case REQUEST(ACTION_TYPES.DELETE_PETINVENTORY):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PETINVENTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PETINVENTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PETINVENTORY):
    case FAILURE(ACTION_TYPES.CREATE_PETINVENTORY):
    case FAILURE(ACTION_TYPES.UPDATE_PETINVENTORY):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PETINVENTORY):
    case FAILURE(ACTION_TYPES.DELETE_PETINVENTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PETINVENTORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PETINVENTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PETINVENTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_PETINVENTORY):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PETINVENTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PETINVENTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/pet-inventories';

// Actions

export const getEntities: ICrudGetAllAction<IPetInventory> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PETINVENTORY_LIST,
  payload: axios.get<IPetInventory>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPetInventory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PETINVENTORY,
    payload: axios.get<IPetInventory>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPetInventory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PETINVENTORY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPetInventory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PETINVENTORY,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IPetInventory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PETINVENTORY,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPetInventory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PETINVENTORY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
