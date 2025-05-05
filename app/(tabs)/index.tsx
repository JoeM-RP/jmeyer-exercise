import { Redirect } from "expo-router";

/**
 * https://stackoverflow.com/a/78267994/4597704
 * This allows us to embed a stack navigator inside a tab navigator.
 * Disadvantage of this approach is Screen Readers will (correctly) identify N+1 visible tabs,
 * even when this tab is invisible and inaccessible.
 */
export default function Tab() {
  return <Redirect href="/(tabs)/(booking)" />;
}
