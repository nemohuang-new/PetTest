import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PhotoUrlComponentsPage from './photo-url.page-object';
import PhotoUrlUpdatePage from './photo-url-update.page-object';
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

describe('PhotoUrl e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let photoUrlComponentsPage: PhotoUrlComponentsPage;
  let photoUrlUpdatePage: PhotoUrlUpdatePage;
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
    photoUrlComponentsPage = new PhotoUrlComponentsPage();
    photoUrlComponentsPage = await photoUrlComponentsPage.goToPage(navBarPage);
  });

  it('should load PhotoUrls', async () => {
    expect(await photoUrlComponentsPage.title.getText()).to.match(/Photo Urls/);
    expect(await photoUrlComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PhotoUrls', async () => {
    const beforeRecordsCount = (await isVisible(photoUrlComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(photoUrlComponentsPage.table);
    photoUrlUpdatePage = await photoUrlComponentsPage.goToCreatePhotoUrl();
    await photoUrlUpdatePage.enterData();

    expect(await photoUrlComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(photoUrlComponentsPage.table);
    await waitUntilCount(photoUrlComponentsPage.records, beforeRecordsCount + 1);
    expect(await photoUrlComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await photoUrlComponentsPage.deletePhotoUrl();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(photoUrlComponentsPage.records, beforeRecordsCount);
      expect(await photoUrlComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(photoUrlComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
