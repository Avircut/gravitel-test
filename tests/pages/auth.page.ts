import { $, browser } from '@wdio/globals';
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AuthPage extends Page {
  /**
     * define selectors using getter methods
     */

  get loginInput() {
    return browser.$('#login');
  }

  get passwordInput() {
    return browser.$('#password');
  }

  get submitBtn() {
    return browser.$('#submit');
  }

  get dashboardPage() {
    return browser.$('#dashboardPage');
  }

  async login(login: string, password: string, clear?: boolean) {
    try {
      await this.open();
      await this.loginInput.waitForDisplayed({ timeout: 1000 });
      await this.loginInput.setValue(login);
      await this.passwordInput.setValue(password);
      await this.submitBtn.click();
      await this.dashboardPage.waitForDisplayed({ timeout: 3000 });
      if (clear) browser.execute('window.localStorage.clear()');
    } catch (e) {
      throw new Error('Не удалось авторизоваться');
    }
  }

  /**
     * overwrite specific options to adapt it to page object
     */
  public open() {
    return super.open('');
  }
}

export default new AuthPage();
