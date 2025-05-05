import { FlatList, Pressable, StyleSheet } from "react-native";

import { Button, Text, View } from "@/components/Themed";
import { ReactElement } from "react";
import i18n from "@/constants/Localization";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APPOINTMENTS, LANG_PREF } from "@/constants/Storage";

const lang_list = [
  { label: "English (US)", val: "en" },
  { label: "Spanish (MX)", val: "es" },
  { label: "Japanese (JP)", val: "jp" },
];

export default function ModalScreen() {
  const router = useRouter();

  function renderItem(i: any): ReactElement {
    const { label, val } = i.item;
    return (
      <Pressable
        id={`Language ${i.index}: ${label}`}
        accessibilityLabel={`Use ${label} as your app language`}
        accessibilityRole="button"
        style={{ marginVertical: 5 }}
        onPress={async () => {
          i18n.changeLanguage(val);
          await AsyncStorage.setItem(LANG_PREF, val);
          router.replace("/");
          i18n.reloadResources();
        }}
      >
        {({ pressed }) => (
          <Text aria-hidden style={{ padding: 10, opacity: pressed ? 0.5 : 1 }}>
            {label}
          </Text>
        )}
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lang_list}
        renderItem={(item) => renderItem(item)}
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.title}>{i18n.t("global.lang")}</Text>
          </View>
        )}
        ListFooterComponentStyle={{ marginTop: 50 }}
        ListFooterComponent={() => (
          <Button
            accessibilityHint="Reset all local app data"
            onPress={async () => {
              await AsyncStorage.removeItem(LANG_PREF);
              await AsyncStorage.removeItem(APPOINTMENTS);
              router.replace("/");
            }}
          >
            {i18n.t("global.reset")}
          </Button>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "stretch",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
