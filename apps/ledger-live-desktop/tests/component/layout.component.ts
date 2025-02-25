import { expect } from "@playwright/test";
import { step } from "../misc/reporters/step";
import { Component } from "tests/page/abstractClasses";

export class Layout extends Component {
  readonly renderError = this.page.getByTestId("render-error");
  readonly appVersion = this.page.getByTestId("app-version");

  // portfolio && accounts
  readonly totalBalance = this.page.getByTestId("total-balance");

  // drawer
  readonly drawerCollapseButton = this.page.getByTestId("drawer-collapse-button");
  readonly drawerPortfolioButton = this.page.getByTestId("drawer-dashboard-button");
  private drawerMarketButton = this.page.getByTestId("drawer-market-button");
  private drawerAccountsButton = this.page.getByTestId("drawer-accounts-button");
  private drawerDiscoverButton = this.page.getByTestId("drawer-catalog-button");
  private drawerSendButton = this.page.getByTestId("drawer-send-button");
  private drawerReceiveButton = this.page.getByTestId("drawer-receive-button");
  private drawerManagerButton = this.page.getByTestId("drawer-manager-button");
  private drawerBuycryptoButton = this.page.getByTestId("drawer-exchange-button");
  private drawerEarnButton = this.page.getByTestId("drawer-earn-button");
  readonly drawerExperimentalButton = this.page.getByTestId("drawer-experimental-button");
  private bookmarkedAccountsList = this.page.getByTestId("drawer-bookmarked-accounts");
  readonly bookmarkedAccounts = this.bookmarkedAccountsList.locator(".bookmarked-account-item");

  // topbar
  private topbarDiscreetButton = this.page.getByTestId("topbar-discreet-button");
  readonly topbarSynchronizeButton = this.page.getByTestId("topbar-synchronize-button");
  private topbarSettingsButton = this.page.getByTestId("topbar-settings-button");
  readonly topbarLockButton = this.page.getByTestId("topbar-password-lock-button");
  readonly topbarHelpButton = this.page.getByTestId("topbar-help-button");
  private discreetTooltip = this.page.locator("#tippy-12"); // automatically generated tippy id but it's consistent

  // general
  readonly inputError = this.page.locator("id=input-error"); // no data-testid because css style is applied
  readonly inputWarning = this.page.getByTestId("alert-insufficient-funds-warning");
  private loadingSpinner = this.page.getByTestId("loading-spinner");
  readonly logo = this.page.getByTestId("logo");

  // updater
  readonly appUpdateBanner = this.page.getByTestId("layout-app-update-banner");
  // }

  readonly marketPerformanceWidget = this.page.getByTestId("market-performance-widget");

  @step("Go to Portfolio")
  async goToPortfolio() {
    await this.drawerPortfolioButton.click();
  }

  async goToMarket() {
    await this.drawerMarketButton.click();
  }

  @step("Check if there is a input error visible")
  async checkInputErrorNotVisible() {
    await this.inputError.waitFor({ state: "hidden" });
  }

  @step("synchronize accounts")
  async syncAccounts() {
    await this.topbarSynchronizeButton.click();
  }

  @step("Open Accounts")
  async goToAccounts() {
    await this.drawerAccountsButton.click();
  }

  @step("Wait for balance to be visible")
  async expectBalanceVisibility() {
    await this.totalBalance.waitFor({ state: "visible" });
  }

  async goToDiscover() {
    await this.drawerDiscoverButton.click();
  }

  async goToManager() {
    await this.drawerManagerButton.click();
  }

  async goToBuyCrypto() {
    await this.drawerBuycryptoButton.click();
  }

  async goToEarn() {
    await this.drawerEarnButton.click();
  }

  async toggleDiscreetMode() {
    await this.topbarDiscreetButton.click();
    await this.discreetTooltip.waitFor({ state: "hidden" }); // makes sure the tooltip has disappeared to prevent flakiness
  }

  @step("Go to Settings")
  async goToSettings() {
    await this.topbarSettingsButton.click();
  }

  @step("Check warning message")
  async checkWarningMessage(expectedWarningMessage: RegExp) {
    await this.inputWarning.waitFor({ state: "visible" });
    const warningText = await this.inputWarning.innerText();
    expect(warningText).toMatch(expectedWarningMessage);
  }

  @step("Check if the error message is the same as expected")
  async checkErrorMessage(errorMessage: string | null) {
    if (errorMessage !== null) {
      await this.inputError.waitFor({ state: "visible" });
      const errorText: any = await this.inputError.textContent();
      const normalize = (str: string) => str.replace(/\u00A0/g, " ").trim();
      expect(normalize(errorText)).toEqual(normalize(errorMessage));
    }
  }

  async lockApp() {
    await this.topbarLockButton.click();
  }

  async openSendModal() {
    await this.drawerSendButton.click();
  }

  async openReceiveModal() {
    await this.drawerReceiveButton.click();
  }

  async waitForLoadingSpinnerToHaveDisappeared() {
    await this.loadingSpinner.waitFor({ state: "detached" });
  }
}
