import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import colors from "../../../../config";

const PreviousList = ({ showDrawer = false, timestamps = [] }) => {
  const refRBSheet = useRef();

  useEffect(() => {
    if (showDrawer) refRBSheet.current.open();
  }, [showDrawer]);

  const handleBackClick = () => {
    refRBSheet.current.close();
  };

  return (
    <View style={styles.container}>
      <RBSheet
        ref={refRBSheet}
        height={850}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Text style={styles.prevResultsTagline}>Previous results</Text>
        <ScrollView style={styles.pane}>
          {timestamps
            ? timestamps.map((ts) => (
                <View key={ts} style={styles.prevResultsItem}>
                  <Text style={styles.prevResultsItemDate}>
                    {ts.format("DD MMM YYYY")}
                  </Text>
                  <Text style={styles.prevResultsItemResult}>
                    <Text style={styles.prevResultsItemResultBullet}>
                      {"\u2B24"}
                    </Text>{" "}
                    PCR Negative
                  </Text>
                </View>
              ))
            : null}
        </ScrollView>
        <TouchableWithoutFeedback onPress={handleBackClick}>
          <Text style={styles.back}>BACK</Text>
        </TouchableWithoutFeedback>
      </RBSheet>
    </View>
  );
};

export default PreviousList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  pane: {
    marginTop: 20,
    marginBottom: 90,
  },
  prevResultsTagline: {
    color: colors.text1,
    fontSize: 16,
    paddingTop: 20,
    paddingHorizontal: 14,
  },
  prevResultsItem: {
    borderBottomColor: colors.dotPassive,
    borderBottomWidth: 1,
    marginTop: 12,
    paddingHorizontal: 14,
  },
  prevResultsItemDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text1,
  },
  prevResultsItemResult: {
    color: colors.text2,
    marginTop: 10,
    marginBottom: 20,
  },
  prevResultsItemResultBullet: {
    fontSize: 15,
    color: colors.primary,
    marginRight: 10,
  },
  back: {
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
