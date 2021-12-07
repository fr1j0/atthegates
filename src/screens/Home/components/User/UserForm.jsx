import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import RBSheet from "react-native-raw-bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORE_KEY } from "../../../../constants/main";

const UserForm = ({ showDrawer = false, setRefetch }) => {
  const refUserName = useRef();
  const refRBSheet = useRef();
  const [isFocus, setIsFocus] = useState(false);
  const [userName, setUserName] = useState();
  const [userEID, setUserEID] = useState();
  const [userPP, setUserPP] = useState();
  const [userPic, setUserPic] = useState();
  const [userBirthday, setUserBirthday] = useState();
  const [userData, setUserData] = useState({
    name: "",
    eid: "",
    pp: "",
    bd: "",
    pic: "",
  });

  useEffect(() => {
    (async () => {
      const jsonValue = await AsyncStorage.getItem(STORE_KEY);
      const parsedValues = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserName(parsedValues.userName);
      setUserEID(parsedValues.userEID);
      setUserPP(parsedValues.userPP);
      setUserBirthday(parsedValues.userBirthday);
      setUserData({
        name: parsedValues.userName,
        eid: parsedValues.userEID,
        pp: parsedValues.userPP,
        bd: parsedValues.userBirthday,
        pic: parsedValues.userPic,
      });
    })();
  }, []);

  useEffect(() => {
    if (showDrawer) refRBSheet.current.open();
  }, [showDrawer]);

  const renderLabel = () => {
    if (userPic || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const handleSaveUserData = async () => {
    try {
      const jsonValue = JSON.stringify({
        userName,
        userEID,
        userPP,
        userBirthday,
        userPic,
      });
      await AsyncStorage.setItem(STORE_KEY, jsonValue);
      setUserData({
        name: userName,
        eid: userEID,
        pp: userPP,
        bd: userBirthday,
        pic: userPic,
      });
      setRefetch(true);
      refRBSheet.current.close();
    } catch (e) {}
  };

  const data = [
    { label: "Fer", value: "fer" },
    { label: "Jo", value: "jo" },
  ];

  return (
    <View style={styles.container}>
      {renderLabel()}
      <RBSheet
        ref={refRBSheet}
        height={475}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={styles.customize}>
          <Input
            ref={refUserName}
            onChangeText={(value) => setUserName(value)}
            placeholder="User name"
            leftIcon={{ type: "font-awesome", name: "user" }}
            defaultValue={userData.name}
          />
          <Input
            onChangeText={(value) => setUserEID(value)}
            placeholder="EID"
            leftIcon={{ type: "font-awesome", name: "id-card" }}
            defaultValue={userData.eid}
          />
          <Input
            onChangeText={(value) => setUserPP(value)}
            placeholder="Passport"
            leftIcon={{ type: "font-awesome", name: "id-badge" }}
            defaultValue={userData.pp}
          />
          <Input
            onChangeText={(value) => setUserBirthday(value)}
            placeholder="Birth date"
            leftIcon={{ type: "font-awesome", name: "calendar" }}
            defaultValue={userData.bd}
          />
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select photo" : "..."}
            value={userData.pic}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setUserPic(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "blue" : "black"}
                name="Safety"
                size={30}
              />
            )}
          />
          <Button
            style={styles.save}
            title="Save"
            onPress={handleSaveUserData}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  customize: {
    padding: 10,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  save: {
    marginTop: 10,
  },
});
