import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PetUpdatePage {
  pageTitle: ElementFinder = element(by.id('nemo1App.pet.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#pet-name'));
  photoUrlsInput: ElementFinder = element(by.css('input#pet-photoUrls'));
  statusInput: ElementFinder = element(by.css('input#pet-status'));
  additionalMetadataInput: ElementFinder = element(by.css('input#pet-additionalMetadata'));
  fileInput: ElementFinder = element(by.css('input#pet-file'));
  inventorySelect: ElementFinder = element(by.css('select#pet-inventory'));
  categorySelect: ElementFinder = element(by.css('select#pet-category'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setPhotoUrlsInput(photoUrls) {
    await this.photoUrlsInput.sendKeys(photoUrls);
  }

  async getPhotoUrlsInput() {
    return this.photoUrlsInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
  }

  async setAdditionalMetadataInput(additionalMetadata) {
    await this.additionalMetadataInput.sendKeys(additionalMetadata);
  }

  async getAdditionalMetadataInput() {
    return this.additionalMetadataInput.getAttribute('value');
  }

  async setFileInput(file) {
    await this.fileInput.sendKeys(file);
  }

  async getFileInput() {
    return this.fileInput.getAttribute('value');
  }

  async inventorySelectLastOption() {
    await this.inventorySelect.all(by.tagName('option')).last().click();
  }

  async inventorySelectOption(option) {
    await this.inventorySelect.sendKeys(option);
  }

  getInventorySelect() {
    return this.inventorySelect;
  }

  async getInventorySelectedOption() {
    return this.inventorySelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption() {
    await this.categorySelect.all(by.tagName('option')).last().click();
  }

  async categorySelectOption(option) {
    await this.categorySelect.sendKeys(option);
  }

  getCategorySelect() {
    return this.categorySelect;
  }

  async getCategorySelectedOption() {
    return this.categorySelect.element(by.css('option:checked')).getText();
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhotoUrlsInput('photoUrls');
    expect(await this.getPhotoUrlsInput()).to.match(/photoUrls/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStatusInput('status');
    expect(await this.getStatusInput()).to.match(/status/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAdditionalMetadataInput('additionalMetadata');
    expect(await this.getAdditionalMetadataInput()).to.match(/additionalMetadata/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFileInput('file');
    expect(await this.getFileInput()).to.match(/file/);
    await this.inventorySelectLastOption();
    await this.categorySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
