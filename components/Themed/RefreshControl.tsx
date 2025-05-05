import { RefreshControl as DefaultRefreshControl } from "react-native";

import React from "react";
import { ThemeProps, useThemeColor } from "../useThemeColor";

export type RefreshProps = ThemeProps & DefaultRefreshControl["props"];

export default function RefreshControl(props: RefreshProps) {
  const { refreshing, onRefresh } = props;
  const tintColor = useThemeColor({}, "loading");
  return (
    <DefaultRefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={tintColor}
    />
  );
}
