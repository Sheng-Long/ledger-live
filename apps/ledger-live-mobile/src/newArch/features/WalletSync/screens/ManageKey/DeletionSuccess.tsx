import React from "react";
import { Success } from "../../components/Success";
import { useTranslation } from "react-i18next";
import { BaseComposite, StackNavigatorProps } from "~/components/RootNavigator/types/helpers";
import { WalletSyncNavigatorStackParamList } from "~/components/RootNavigator/types/WalletSyncNavigator";

import { NavigatorName, ScreenName } from "~/const";

type Props = BaseComposite<
  StackNavigatorProps<
    WalletSyncNavigatorStackParamList,
    ScreenName.WalletSyncManageKeyDeleteSuccess
  >
>;

export function WalletSyncManageKeyDeletionSuccess({ navigation }: Props) {
  const { t } = useTranslation();

  function close(): void {
    navigation.navigate(NavigatorName.Settings, {
      screen: ScreenName.GeneralSettings,
    });
  }

  return (
    <Success
      title={t("walletSync.walletSyncActivated.manageKey.success")}
      secondaryButton={{
        label: t("walletSync.success.close"),
        onPress: close,
      }}
    />
  );
}
