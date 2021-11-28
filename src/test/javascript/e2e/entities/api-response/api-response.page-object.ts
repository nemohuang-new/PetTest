import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ApiResponseUpdatePage from './api-response-update.page-object';

const expect = chai.expect;
export class ApiResponseDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('nemo1App.apiResponse.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-apiResponse'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ApiResponseComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('api-response-heading'));
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
    await navBarPage.getEntityPage('api-response');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateApiResponse() {
    await this.createButton.click();
    return new ApiResponseUpdatePage();
  }

  async deleteApiResponse() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const apiResponseDeleteDialog = new ApiResponseDeleteDialog();
    await waitUntilDisplayed(apiResponseDeleteDialog.deleteModal);
    expect(await apiResponseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/nemo1App.apiResponse.delete.question/);
    await apiResponseDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(apiResponseDeleteDialog.deleteModal);

    expect(await isVisible(apiResponseDeleteDialog.deleteModal)).to.be.false;
  }
}
