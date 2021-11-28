import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PetInventoryComponentsPage from './pet-inventory.page-object';
import PetInventoryUpdatePage from './pet-inventory-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('PetInventory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let petInventoryComponentsPage: PetInventoryComponentsPage;
  let petInventoryUpdatePage: PetInventoryUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth(username, password);
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    petInventoryComponentsPage = new PetInventoryComponentsPage();
    petInventoryComponentsPage = await petInventoryComponentsPage.goToPage(navBarPage);
  });

  it('should load PetInventories', async () => {
    expect(await petInventoryComponentsPage.title.getText()).to.match(/Pet Inventories/);
    expect(await petInventoryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PetInventories', async () => {
    const beforeRecordsCount = (await isVisible(petInventoryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(petInventoryComponentsPage.table);
    petInventoryUpdatePage = await petInventoryComponentsPage.goToCreatePetInventory();
    await petInventoryUpdatePage.enterData();

    expect(await petInventoryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(petInventoryComponentsPage.table);
    await waitUntilCount(petInventoryComponentsPage.records, beforeRecordsCount + 1);
    expect(await petInventoryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await petInventoryComponentsPage.deletePetInventory();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(petInventoryComponentsPage.records, beforeRecordsCount);
      expect(await petInventoryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(petInventoryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
