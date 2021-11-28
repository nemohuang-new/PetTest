import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApiResponse, defaultValue } from 'app/shared/model/api-response.model';

export const ACTION_TYPES = {
  FETCH_APIRESPONSE_LIST: 'apiResponse/FETCH_APIRESPONSE_LIST',
  FETCH_APIRESPONSE: 'apiResponse/FETCH_APIRESPONSE',
  CREATE_APIRESPONSE: 'apiResponse/CREATE_APIRESPONSE',
  UPDATE_APIRESPONSE: 'apiResponse/UPDATE_APIRESPONSE',
  PARTIAL_UPDATE_APIRESPONSE: 'apiResponse/PARTIAL_UPDATE_APIRESPONSE',
  DELETE_APIRESPONSE: 'apiResponse/DELETE_APIRESPONSE',
  RESET: 'apiResponse/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApiResponse>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ApiResponseState = Readonly<typeof initialState>;

// Reducer

export default (state: ApiResponseState = initialState, action): ApiResponseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APIRESPONSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APIRESPONSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_APIRESPONSE):
    case REQUEST(ACTION_TYPES.UPDATE_APIRESPONSE):
    case REQUEST(ACTION_TYPES.DELETE_APIRESPONSE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_APIRESPONSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_APIRESPONSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APIRESPONSE):
    case FAILURE(ACTION_TYPES.CREATE_APIRESPONSE):
    case FAILURE(ACTION_TYPES.UPDATE_APIRESPONSE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_APIRESPONSE):
    case FAILURE(ACTION_TYPES.DELETE_APIRESPONSE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIRESPONSE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIRESPONSE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_APIRESPONSE):
    case SUCCESS(ACTION_TYPES.UPDATE_APIRESPONSE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_APIRESPONSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_APIRESPONSE):
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

const apiUrl = 'api/api-responses';

// Actions

export const getEntities: ICrudGetAllAction<IApiResponse> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_APIRESPONSE_LIST,
  payload: axios.get<IApiResponse>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IApiResponse> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APIRESPONSE,
    payload: axios.get<IApiResponse>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IApiResponse> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APIRESPONSE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApiResponse> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APIRESPONSE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IApiResponse> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_APIRESPONSE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApiResponse> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APIRESPONSE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
