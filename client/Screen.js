import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Screen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const tableNo = data.split(/\r?\n/)[1];
    const res = data.split(" ")[0];
    console.log(`tableNo: ${tableNo}`);
    fetch(`http://192.168.100.69:5000/menu?res=${res}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((menu) => {
        navigation.navigate("Navigation", {
          data: menu,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.scanner]}
      >
        <Text style={styles.description}>Scan your QR code</Text>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: 25,
    marginTop: "10%",
    textAlign: "center",
    width: "70%",
    color: "#ffff",
    position: "absolute",
    top: "10%",
    left: "15%",
  },
  scanner: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  layerTop: {
    flex: 3,
    backgroundColor: opacity,
    height: 150,
  },
  layerCenter: {
    flex: 3,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 3,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 3,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 3,
    backgroundColor: opacity,
  },
});
