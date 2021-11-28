import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPhotoUrl, defaultValue } from 'app/shared/model/photo-url.model';

export const ACTION_TYPES = {
  FETCH_PHOTOURL_LIST: 'photoUrl/FETCH_PHOTOURL_LIST',
  FETCH_PHOTOURL: 'photoUrl/FETCH_PHOTOURL',
  CREATE_PHOTOURL: 'photoUrl/CREATE_PHOTOURL',
  UPDATE_PHOTOURL: 'photoUrl/UPDATE_PHOTOURL',
  PARTIAL_UPDATE_PHOTOURL: 'photoUrl/PARTIAL_UPDATE_PHOTOURL',
  DELETE_PHOTOURL: 'photoUrl/DELETE_PHOTOURL',
  RESET: 'photoUrl/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPhotoUrl>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PhotoUrlState = Readonly<typeof initialState>;

// Reducer

export default (state: PhotoUrlState = initialState, action): PhotoUrlState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PHOTOURL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PHOTOURL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PHOTOURL):
    case REQUEST(ACTION_TYPES.UPDATE_PHOTOURL):
    case REQUEST(ACTION_TYPES.DELETE_PHOTOURL):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PHOTOURL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PHOTOURL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PHOTOURL):
    case FAILURE(ACTION_TYPES.CREATE_PHOTOURL):
    case FAILURE(ACTION_TYPES.UPDATE_PHOTOURL):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PHOTOURL):
    case FAILURE(ACTION_TYPES.DELETE_PHOTOURL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHOTOURL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHOTOURL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PHOTOURL):
    case SUCCESS(ACTION_TYPES.UPDATE_PHOTOURL):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PHOTOURL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PHOTOURL):
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

const apiUrl = 'api/photo-urls';

// Actions

export const getEntities: ICrudGetAllAction<IPhotoUrl> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PHOTOURL_LIST,
  payload: axios.get<IPhotoUrl>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPhotoUrl> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PHOTOURL,
    payload: axios.get<IPhotoUrl>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPhotoUrl> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PHOTOURL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPhotoUrl> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PHOTOURL,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IPhotoUrl> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PHOTOURL,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPhotoUrl> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PHOTOURL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
