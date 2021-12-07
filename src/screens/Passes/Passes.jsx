import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { AnimatedSVGPath } from "react-native-svg-animations";
import colors from "../../config";
import dayjs from "dayjs";
import { useTimer } from "use-timer";
import Dots from "react-native-dots-pagination";
import { STORE_KEY } from "../../constants/main";
import {
  hideEID as hideEIDUtil,
  hidePPN as hidePPNUtil,
  hideDoB as hideDoBUtil,
  formatHours,
} from "../../utils";

export default function Passes({ navigation }) {
  const [hideEID, setHideEID] = useState(true);
  const [hidePPN, setHidePPN] = useState(true);
  const [hideDOB, setHideDOB] = useState(true);
  const [timerString, setTimerString] = useState("");
  const [timestamp, setTimestamp] = useState();
  const [formattedDate, setFormattedDate] = useState("");
  const [elapsedTime, setElapsedTime] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    eid: "",
    ppn: "",
    bd: "",
    pic: "",
  });

  const radius = 6;
  const size = 148;
  const d = `M20,20 h${size} a${radius},${radius} 0 0 1 ${radius},${radius} v${size} a${radius},${radius} 0 0 1 -${radius},${radius} h-${size} a${radius},${radius} 0 0 1 -${radius},-${radius} v-${size} a${radius},${radius} 0 0 1 ${radius},-${radius} z`;
  const strokeLength = 298;
  const TIMER_LIMIT = 5 * 60; // 5 minutes

  const { time, start, pause, reset, status } = useTimer({
    autostart: true,
    endTime: TIMER_LIMIT,
  });

  useEffect(() => {
    (async () => {
      const store = await AsyncStorage.getItem(STORE_KEY);
      const parsedValues = store != null ? JSON.parse(store) : null;

      const ts = parsedValues.date ?? new Date().getTime();

      const hoursDiff = dayjs().diff(dayjs(ts), "hour");
      const daysDiff = Math.floor(hoursDiff / 24);

      setElapsedTime(formatHours(hoursDiff));

      setFormattedDate(
        dayjs().subtract(daysDiff, "days").format("DD MMM YYYY")
      );
    })();
  }, [timestamp]);

  useEffect(() => {
    (async () => {
      const jsonValue = await AsyncStorage.getItem(STORE_KEY);
      const parsedValues = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserData({
        name: parsedValues.userName,
        eid: parsedValues.userEID,
        ppn: parsedValues.userPP,
        bd: parsedValues.userBirthday,
        pic: parsedValues.userPic,
      });
    })();
  }, []);

  useEffect(() => {
    const secondsLeft = TIMER_LIMIT - time;
    const timeStr = dayjs(secondsLeft * 1000).format("mm ss");
    setTimerString(timeStr);
    if (secondsLeft === 0) start();
  }, [time]);

  const handleRefreshDate = async () => {
    try {
      const newTimestamp = new Date().getTime();
      await AsyncStorage.mergeItem(
        STORE_KEY,
        JSON.stringify({
          date: newTimestamp,
        })
      );

      setTimestamp(newTimestamp);

      reset();
      start();
    } catch (e) {}
  };

  const userPic =
    userData.pic === "jo"
      ? require("../../../assets/images/jo.png")
      : require("../../../assets/images/fer.png");

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
          <MaterialCommunityIcons
            style={styles.headerOption}
            name="refresh"
            onPress={handleRefreshDate}
          />
          <MaterialCommunityIcons
            style={styles.headerOption}
            name="dots-vertical"
          />
        </View>
      </View>
      <View style={styles.pane}>
        <Dots
          length={2}
          active={0}
          marginHorizontal={3}
          paddingVertical={0}
          passiveDotWidth={8}
          passiveDotHeight={8}
          activeDotWidth={8}
          activeDotHeight={7}
          activeColor={colors.dotActive}
          passiveColor={colors.dotPassive}
        />
        <ImageBackground
          source={require("../../../assets/images/mosque.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <ImageBackground
            source={require("../../../assets/images/logo-green.png")}
            resizeMode="stretch"
            style={styles.paneLogo}
            imageStyle={{
              top: 8,
              left: 7,
              width: 27,
              height: 27,
            }}
          />
          <Image
            source={require("../../../assets/images/pincho.png")}
            style={styles.paneExempt}
            imageStyle={{
              top: 48,
              left: 7,
              width: 27,
              height: 27,
            }}
          />
          <View style={styles.paneInfo}>
            <MaterialCommunityIcons
              name="information-outline"
              style={styles.paneInfoIcon}
            />
          </View>

          <ImageBackground
            source={userPic}
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
            <Text style={styles.name}>{userData.name}</Text>
            <Text
              style={styles.eid}
              onPress={() => {
                setHideEID((h) => !h);
                setHidePPN((p) => !p);
              }}
            >
              {`EID: ${
                hideEID ? hideEIDUtil(userData.eid) : userData.eid
              } • PPN: ${hidePPN ? hidePPNUtil(userData.ppn) : userData.ppn}`}
            </Text>
            <Text
              style={styles.dob}
              onPress={() => {
                setHideDOB((d) => !d);
              }}
            >{`DoB: ${hideDOB ? hideDoBUtil(userData.bd) : userData.bd}`}</Text>
          </View>
        </ImageBackground>
        <View style={styles.qr}>
          <Text style={styles.qrText1}>{elapsedTime} - PCR Negative</Text>
          <Text style={styles.qrText2}>Since {formattedDate}</Text>
          <View style={styles.qrImageWrapper}>
            <Image
              style={styles.qrImage}
              source={require("../../../assets/images/qr.png")}
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
          <Text style={styles.qrUpdate}>
            QR code will be updated in {timerString}
          </Text>
        </View>
        <View style={styles.prevResults}>
          <View style={styles.prevResultsHeader}>
            <Text style={styles.prevResultsTagline}>Previous results</Text>
            <Text style={styles.prevResultsViewAll}>VIEW ALL</Text>
          </View>
          {/* <View style={styles.prevResultsItem}>
            <View>
              <Text style={styles.prevResultsItemDate}>18 Nov 2021</Text>
              <Text style={styles.prevResultsItemResult}>PCR Negative</Text>
            </View>
          </View> */}
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
    paddingTop: 20,
    backgroundColor: colors.secondary,
    flex: 1,
    borderRadius: 15 | 15 | 0 | 0,
    padding: 14,
  },
  paneLogo: {
    position: "absolute",
    left: 15,
    top: 15,
    width: 29,
    height: 29,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 25,
  },
  paneExempt: {
    position: "absolute",
    left: 15,
    top: 75,
    width: 25,
    height: 25,
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
    textTransform: "uppercase",
  },
  eid: {
    color: "white",
    marginBottom: 6,
    textTransform: "uppercase",
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
    fontSize: 11,
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
  prevResults: {
    marginTop: 20,
  },
  prevResultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prevResultsTagline: {
    color: colors.text2,
  },
  prevResultsViewAll: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
