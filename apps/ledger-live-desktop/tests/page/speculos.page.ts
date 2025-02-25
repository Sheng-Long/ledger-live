import { AppPage } from "tests/page/abstractClasses";
import { step } from "tests/misc/reporters/step";

import {
  pressBoth,
  pressRightUntil,
  verifyAddress as assertAddressesEquality,
  verifyAmount,
  waitFor,
} from "tests/utils/speculos";
import { Account } from "../enum/Account";
import { expect } from "@playwright/test";
import { Transaction } from "tests/models/Transaction";
import { DeviceLabels } from "tests/enum/DeviceLabels";
import { Currency } from "tests/enum/Currency";

export class SpeculosPage extends AppPage {
  @step("Verify receive address correctness")
  async expectValidReceiveAddress(account: Account) {
    const { receivePattern } = account.currency.speculosApp || {};
    if (!receivePattern) {
      return;
    }
    await waitFor(receivePattern[0]);
    const actualAddress = await pressRightUntil(receivePattern[0]);
    expect(assertAddressesEquality(account.address, actualAddress)).toBe(true);
    await pressRightUntil(receivePattern[1]);
    await pressBoth();
  }

  @step("Verify transaction info on device")
  async expectValidTxInfo(tx: Transaction) {
    const { sendPattern } = tx.accountToDebit.currency.speculosApp || {};
    if (!sendPattern) {
      return;
    }
    const amountScreen = await pressRightUntil(sendPattern[0]);
    expect(verifyAmount(tx.amount, amountScreen)).toBe(true);
    const addressScreen = await pressRightUntil(sendPattern[1]);
    expect(assertAddressesEquality(tx.accountToCredit.address, addressScreen)).toBe(true);
    await pressRightUntil(sendPattern[2]);
    await pressBoth();
    if (tx.accountToDebit.currency.name === Currency.DOGE.name) {
      await waitFor("Confirm");
      await pressRightUntil(DeviceLabels.ACCEPT);
      await pressBoth();
    }
  }

  @step("Press right on the device until specified text appears, then confirm the operation")
  async confirmOperationOnDevice(text: string) {
    await pressRightUntil(text);
    await pressBoth();
  }
}
