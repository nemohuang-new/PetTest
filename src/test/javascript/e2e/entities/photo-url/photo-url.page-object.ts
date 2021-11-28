import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PhotoUrlUpdatePage from './photo-url-update.page-object';

const expect = chai.expect;
export class PhotoUrlDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('nemo1App.photoUrl.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-photoUrl'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PhotoUrlComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('photo-url-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('photo-url');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePhotoUrl() {
    await this.createButton.click();
    return new PhotoUrlUpdatePage();
  }

  async deletePhotoUrl() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const photoUrlDeleteDialog = new PhotoUrlDeleteDialog();
    await waitUntilDisplayed(photoUrlDeleteDialog.deleteModal);
    expect(await photoUrlDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/nemo1App.photoUrl.delete.question/);
    await photoUrlDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(photoUrlDeleteDialog.deleteModal);

    expect(await isVisible(photoUrlDeleteDialog.deleteModal)).to.be.false;
  }
}
