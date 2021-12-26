import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { hideEID } from "../../utils";
import colors from "../../config";
import UserForm from "./components/User";
import { STORE_KEY } from "../../constants/main";

const Home = ({ navigation }) => {
  const [refetch, setRefetch] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    eid: "",
    pp: "",
    bd: "",
  });
  const [showDrawer, setShowDrawer] = useState(false);

  const handleMenuClick = () => {
    setShowDrawer((sd) => !sd);
  };

  useEffect(() => {
    (async () => {
      const jsonValue = await AsyncStorage.getItem(STORE_KEY);
      const parsedValues = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserData({
        name: parsedValues.userName,
        eid: parsedValues.userEID,
        pp: parsedValues.userPP,
        bd: parsedValues.userBirthday,
      });
      setRefetch(false);
    })();
  }, [refetch]);

  return (
    <SafeAreaView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.header}>
        <Feather
          style={styles.headerBars}
          name="menu"
          size={24}
          color="black"
          onPress={handleMenuClick}
        />
        <MaterialCommunityIcons style={styles.headerBell} name="bell-outline" />
        <Image
          style={styles.headerImage}
          source={require("../../../assets/images/logo.png")}
        />
        <Text style={styles.headerALHOSN}>ALHOSN</Text>
      </View>
      <View style={styles.pane}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Passes")}>
          <View style={styles.user}>
            <Image
              style={styles.userAvatar}
              source={require("../../../assets/images/user-avatar.png")}
            />
            <Text
              style={styles.userName}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {userData.name}
            </Text>
            <Text style={styles.userEID}>{hideEID(userData.eid)}</Text>
            <AntDesign name="right" style={styles.userArrow} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Text style={styles.addUser}>+ ADD USER</Text>
        </TouchableWithoutFeedback>
      </View>
      <UserForm showDrawer={showDrawer} setRefetch={setRefetch} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 130,
    backgroundColor: colors.primary,
  },
  headerBars: {
    position: "absolute",
    left: 15,
    top: 0,
    fontSize: 24,
    color: "white",
  },
  headerBell: {
    position: "absolute",
    right: 15,
    top: 2,
    fontSize: 24,
    color: "white",
  },
  headerImage: {
    width: 42,
    height: 48,
  },
  headerALHOSN: {
    color: "white",
    fontSize: 35,
    marginLeft: 10,
    fontWeight: "700",
  },
  pane: {
    backgroundColor: colors.secondary,
    flex: 1,
    borderRadius: 15 | 15 | 0 | 0,
    padding: 14,
  },
  user: {
    padding: 17,
    paddingRight: 50,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    ...colors.shadow,
  },
  userAvatar: {
    position: "absolute",
    width: 28,
    height: 28,
  },
  userAvatarIcon: {
    position: "absolute",
    padding: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text1,
    textTransform: "uppercase",
  },
  userEID: {
    fontSize: 16,
    marginTop: 5,
    color: colors.text2,
  },
  userArrow: {
    position: "absolute",
    fontSize: 24,
    right: 17,
    top: 27,
    color: colors.text2,
  },
  addUser: {
    color: colors.primary,
    fontSize: 18,
    backgroundColor: "white",
    bottom: 20,
    left: 20,
    right: 20,
    position: "absolute",
    padding: 2 | 10,
    borderRadius: 10,
    textAlign: "center",
    color: colors.text3,
    ...colors.shadow,
  },
});
