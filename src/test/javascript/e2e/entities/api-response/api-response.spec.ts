import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ApiResponseComponentsPage from './api-response.page-object';
import ApiResponseUpdatePage from './api-response-update.page-object';
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

describe('ApiResponse e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let apiResponseComponentsPage: ApiResponseComponentsPage;
  let apiResponseUpdatePage: ApiResponseUpdatePage;
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
    apiResponseComponentsPage = new ApiResponseComponentsPage();
    apiResponseComponentsPage = await apiResponseComponentsPage.goToPage(navBarPage);
  });

  it('should load ApiResponses', async () => {
    expect(await apiResponseComponentsPage.title.getText()).to.match(/Api Responses/);
    expect(await apiResponseComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ApiResponses', async () => {
    const beforeRecordsCount = (await isVisible(apiResponseComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(apiResponseComponentsPage.table);
    apiResponseUpdatePage = await apiResponseComponentsPage.goToCreateApiResponse();
    await apiResponseUpdatePage.enterData();

    expect(await apiResponseComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(apiResponseComponentsPage.table);
    await waitUntilCount(apiResponseComponentsPage.records, beforeRecordsCount + 1);
    expect(await apiResponseComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await apiResponseComponentsPage.deleteApiResponse();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(apiResponseComponentsPage.records, beforeRecordsCount);
      expect(await apiResponseComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(apiResponseComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
