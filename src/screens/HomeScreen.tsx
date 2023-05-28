import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import tw from "../utils/tailwind";
import { useState, useEffect } from "react";
import { Screen } from "../components/Screen";
import { useNavigation } from "@react-navigation/native";
import { profileScreenProp, searchResultScreenProp } from "../../types";
import { trimTld, validate } from "../utils/validate";
import { useModal } from "react-native-modalfy";
import { isPubkey } from "../utils/publickey";
import { useTranslation, Trans } from "react-i18next";
import i18n from "../i18n";
export function HomeScreen() {
  const { openModal } = useModal();
  const [search, setSearch] = useState("");
  const navigation = useNavigation<
    searchResultScreenProp | profileScreenProp
  >();

  const { t } = useTranslation();

  // useEffect(() => {
  //   i18n.changeLanguage("kr");
  // }, [i18n]);

  const handle = async () => {
    if (!search) return;
    if (isPubkey(search)) {
      return navigation.navigate("Search", {
        screen: "Search Profile",
        params: { owner: search },
      });
    }
    if (!validate(search)) {
      return openModal("Error", {
        msg: `${t("Modal.Error.invalidDomain", { search })}`,
      });
    }
    navigation.navigate("Search", {
      screen: "Search Result",
      params: { domain: trimTld(search) },
    });
  };

  return (
    <Screen style={tw`flex flex-col items-center justify-center`}>
      <View style={tw`mb-4`}>
        <Image
          resizeMode="contain"
          style={tw`w-[150px] h-[150px]`}
          source={require("../../assets/fida.svg")}
        />
      </View>

      <Text style={tw`text-3xl font-bold text-center text-blue-grey-900`}>
        <Trans
          i18nKey="HomeScreen.yourNamePower"
          components={{
            underline: <Text style={tw`text-blue-700 underline`} />,
          }}
        />
      </Text>
      <Text style={tw`px-10 my-5 text-sm text-center text-blue-grey-500`}>
        {t("HomeScreen.seizeIdentity")}
      </Text>
      <View
        style={tw`flex flex-row h-[71px] justify-center w-full items-center border-[1px] border-black/10 rounded-lg`}
      >
        <TextInput
          style={[
            Platform.OS === "web" && { outlineWidth: 0 },
            tw`w-70% bg-white h-full rounded-l-lg pl-5 font-semibold shadow-xl shadow-blue-900`,
          ]}
          onChangeText={(newText) => setSearch(newText)}
          value={search}
          placeholder={t("HomeScreen.searchPlaceholder").toString()}
          placeholderTextColor="#BCCCDC"
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Enter") {
              handle();
            }
          }}
        />

        <TouchableOpacity
          onPress={handle}
          style={tw`bg-blue-900 w-[30%] h-[72px] rounded-tr-lg rounded-br-lg flex items-center justify-center`}
        >
          <Text style={tw`text-lg font-bold text-white`}>
            {t("HomeScreen.search")}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
