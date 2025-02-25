import React, { useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";
import { findCryptoCurrencyByKeyword } from "@ledgerhq/live-common/currencies/index";
import { BUY_SELL_UI_APP_ID } from "@ledgerhq/live-common/wallet-api/constants";
import { useFeature } from "@ledgerhq/live-common/featureFlags/index";
import { ScreenName } from "~/const";
import { getStackNavigatorConfig } from "~/navigation/navigatorConfig";

import styles from "~/navigation/styles";
import type { ExchangeLiveAppNavigatorParamList } from "./types/ExchangeLiveAppNavigator";
import type { StackNavigatorProps } from "./types/helpers";
import { BuyAndSellScreen } from "~/screens/PTX/BuyAndSell";

const Stack = createStackNavigator<ExchangeLiveAppNavigatorParamList>();

const ExchangeBuy = (
  _props: StackNavigatorProps<ExchangeLiveAppNavigatorParamList, ScreenName.ExchangeBuy>,
) => {
  const buySellUiFlag = useFeature("buySellUi");
  const defaultPlatform = buySellUiFlag?.params?.manifestId || BUY_SELL_UI_APP_ID;
  return (
    <BuyAndSellScreen
      {..._props}
      route={{
        ..._props.route,
        params: {
          account: _props.route.params?.defaultAccountId,
          currency: _props.route.params?.currency
            ? findCryptoCurrencyByKeyword(_props.route.params?.currency)?.id
            : _props.route.params?.defaultCurrencyId,
          goToURL: _props.route.params?.goToURL,
          lastScreen: _props.route.params?.lastScreen,
          mode: "buy",
          platform: _props.route.params?.platform || defaultPlatform,
          referrer: _props.route.params?.referrer,
        },
      }}
    />
  );
};

const ExchangeSell = (
  _props: StackNavigatorProps<ExchangeLiveAppNavigatorParamList, ScreenName.ExchangeSell>,
) => {
  const buySellUiFlag = useFeature("buySellUi");
  const defaultPlatform = buySellUiFlag?.params?.manifestId || BUY_SELL_UI_APP_ID;
  return (
    <BuyAndSellScreen
      {..._props}
      route={{
        ..._props.route,
        params: {
          account: _props.route.params?.defaultAccountId,
          currency: _props.route.params?.currency
            ? findCryptoCurrencyByKeyword(_props.route.params?.currency)?.id
            : _props.route.params?.defaultCurrencyId,
          goToURL: _props.route.params?.goToURL,
          lastScreen: _props.route.params?.lastScreen,
          mode: "sell",
          platform: _props.route.params?.platform || defaultPlatform,
          referrer: _props.route.params?.referrer,
        },
      }}
    />
  );
};

export default function ExchangeLiveAppNavigator(_props?: Record<string, unknown>) {
  const { colors } = useTheme();

  const stackNavigationConfig = useMemo(() => getStackNavigatorConfig(colors, true), [colors]);

  return (
    <Stack.Navigator {...stackNavigationConfig}>
      <Stack.Screen
        name={ScreenName.ExchangeBuy}
        options={{
          headerStyle: styles.headerNoShadow,
          title: "",
        }}
      >
        {props => <ExchangeBuy {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name={ScreenName.ExchangeSell}
        options={{
          headerStyle: styles.headerNoShadow,
        }}
      >
        {props => <ExchangeSell {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
