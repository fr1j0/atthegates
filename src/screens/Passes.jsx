import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { AnimatedSVGPath } from "react-native-svg-animations";
import colors from "../config";

export default function Passes({ navigation }) {
  const radius = 6;
  const size = 148;
  const d = `M20,20 h${size} a${radius},${radius} 0 0 1 ${radius},${radius} v${size} a${radius},${radius} 0 0 1 -${radius},${radius} h-${size} a${radius},${radius} 0 0 1 -${radius},-${radius} v-${size} a${radius},${radius} 0 0 1 ${radius},-${radius} z`;
  const strokeLength = 298;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          name="left"
          size={24}
          style={styles.headerBack}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Green Pass</Text>
        <View style={styles.headerOptions}>
          <MaterialCommunityIcons style={styles.headerOption} name="refresh" />
          <MaterialCommunityIcons
            style={styles.headerOption}
            name="dots-vertical"
          />
        </View>
      </View>
      <View style={styles.pane}>
        <ImageBackground
          source={require("../../assets/images/mosque2.png")}
          resizeMode="stretch"
          style={styles.image}
        >
          <ImageBackground
            source={require("../../assets/images/logo-green.png")}
            resizeMode="stretch"
            style={styles.paneLogo}
            imageStyle={{
              top: 9,
              left: 8,
              width: 28,
              height: 28,
            }}
          />
          <View style={styles.paneInfo}>
            <MaterialCommunityIcons
              name="information-outline"
              style={styles.paneInfoIcon}
            />
          </View>

          <ImageBackground
            source={require("../../assets/images/fer.png")}
            resizeMode="cover"
            style={styles.profilePic}
            imageStyle={{
              top: 2,
              left: 0,
              width: 100,
              height: 100,
            }}
          />

          <View style={styles.profileData}>
            <Text style={styles.name}>FERNANDO CASTILLO CARDENOSA</Text>
            <Text style={styles.eid}>
              EID: 84-1971-3297075-3 &bull; PPN: PAI838655
            </Text>
            <Text style={styles.dob}>DoB: 18 Apr 1971</Text>
          </View>
        </ImageBackground>
        <View style={styles.qr}>
          <Text style={styles.qrText1}>2 days - PCR Negative</Text>
          <Text style={styles.qrText2}>Since 06 Nov 2021</Text>
          <View style={styles.qrImageWrapper}>
            <Image
              style={styles.qrImage}
              source={require("../../assets/images/qr.png")}
            />
            <View style={styles.qrBorder}>
              <AnimatedSVGPath
                strokeColor={colors.terciary}
                duration={4000}
                strokeWidth={4}
                scale={1}
                delay={100}
                d={d}
                loop={true}
                strokeDashArray={[strokeLength]}
              />
            </View>
          </View>
          <Text style={styles.qrUpdate}>QR code will be updated in 04:22</Text>
        </View>
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
    height: 42,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 20,
    top: 0,
    fontWeight: "700",
    color: colors.secondary,
  },
  headerBack: {
    fontSize: 24,
    position: "absolute",
    left: 10,
    color: colors.secondary,
  },
  headerOptions: {
    position: "absolute",
    right: 10,
    flexDirection: "row",
  },
  headerOption: {
    fontSize: 24,
    marginLeft: 15,
    color: colors.secondary,
  },
  pane: {
    paddingTop: 30,
    backgroundColor: colors.secondary,
    flex: 1,
    borderRadius: 15 | 15 | 0 | 0,
    padding: 14,
  },
  paneLogo: {
    position: "absolute",
    left: 15,
    top: 15,
    width: 30,
    height: 30,
    padding: 22,
    backgroundColor: "white",
    borderRadius: 25,
  },
  paneInfo: {
    position: "absolute",
    right: 0,
    top: 15,
    width: 40,
    height: 38,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  paneInfoIcon: {
    color: colors.text2,
    fontSize: 23,
  },
  profilePic: {
    width: 110,
    height: 110,
    backgroundColor: "white",
    borderRadius: 125,
    borderColor: "white",
    borderWidth: 4,
    top: 30,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 285,
    marginTop: 10,
    backgroundColor: colors.terciary,
    alignItems: "center",
    borderRadius: 5,
  },
  name: {
    fontSize: 20,
    color: "white",
    flexWrap: "wrap",
    maxWidth: 200,
    textAlign: "center",
    marginBottom: 6,
    fontWeight: "bold",
  },
  eid: {
    color: "white",
    marginBottom: 6,
  },
  dob: {
    color: "white",
  },
  qr: {
    alignItems: "center",
    paddingTop: 20,
  },
  qrText1: {
    fontSize: 23,
    marginBottom: 10,
    fontWeight: "bold",
    color: colors.text1,
  },
  qrText2: {
    fontSize: 16,
    marginBottom: 15,
    color: colors.text1,
  },
  qrUpdate: {
    fontSize: 10,
    marginTop: 15,
    color: colors.text2,
  },
  qrImage: {
    width: 155,
    height: 155,
  },
  qrImageWrapper: {
    width: 164,
    height: 164,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#cccccc",
    overflow: "visible",
  },
  profileData: {
    alignItems: "center",
    position: "absolute",
    bottom: 30,
  },
  qrBorder: {
    position: "absolute",
    top: -22,
    left: -16,
  },
});
