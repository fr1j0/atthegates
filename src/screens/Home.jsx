import React from "react";
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
import colors from "../config";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather
          style={styles.headerBars}
          name="menu"
          size={24}
          color="black"
        />
        <MaterialCommunityIcons style={styles.headerBell} name="bell-outline" />
        <Image
          style={styles.headerImage}
          source={require("../../assets/images/logo.png")}
        />
        <Text style={styles.headerALHOSN}>ALHOSN</Text>
      </View>
      <View style={styles.pane}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Passes")}>
          <View style={styles.user}>
            <Text style={styles.userName}>FERNANDO CASTILLO CARDE...</Text>
            <Text style={styles.userEID}>784-1971-********-3</Text>
            <AntDesign name="right" style={styles.userArrow} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log("adsad")}>
          <Text style={styles.addUser}>+ ADD USER</Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}

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
    fontSize: 23,
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
    backgroundColor: "white",
    borderRadius: 10,
    ...colors.shadow,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text1,
  },
  userEID: {
    fontSize: 14,
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
