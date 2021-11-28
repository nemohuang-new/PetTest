import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ApiResponseUpdatePage {
  pageTitle: ElementFinder = element(by.id('nemo1App.apiResponse.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#api-response-code'));
  typeInput: ElementFinder = element(by.css('input#api-response-type'));
  messageInput: ElementFinder = element(by.css('input#api-response-message'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return this.typeInput.getAttribute('value');
  }

  async setMessageInput(message) {
    await this.messageInput.sendKeys(message);
  }

  async getMessageInput() {
    return this.messageInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setCodeInput('5');
    expect(await this.getCodeInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setTypeInput('type');
    expect(await this.getTypeInput()).to.match(/type/);
    await waitUntilDisplayed(this.saveButton);
    await this.setMessageInput('message');
    expect(await this.getMessageInput()).to.match(/message/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
