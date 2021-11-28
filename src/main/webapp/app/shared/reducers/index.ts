import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import order, {
  OrderState
} from 'app/entities/order/order.reducer';
// prettier-ignore
import tag, {
  TagState
} from 'app/entities/tag/tag.reducer';
// prettier-ignore
import category, {
  CategoryState
} from 'app/entities/category/category.reducer';
// prettier-ignore
import apiResponse, {
  ApiResponseState
} from 'app/entities/api-response/api-response.reducer';
// prettier-ignore
import pet, {
  PetState
} from 'app/entities/pet/pet.reducer';
// prettier-ignore
import photoUrl, {
  PhotoUrlState
} from 'app/entities/photo-url/photo-url.reducer';
// prettier-ignore
import petInventory, {
  PetInventoryState
} from 'app/entities/pet-inventory/pet-inventory.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly order: OrderState;
  readonly tag: TagState;
  readonly category: CategoryState;
  readonly apiResponse: ApiResponseState;
  readonly pet: PetState;
  readonly photoUrl: PhotoUrlState;
  readonly petInventory: PetInventoryState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  order,
  tag,
  category,
  apiResponse,
  pet,
  photoUrl,
  petInventory,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
