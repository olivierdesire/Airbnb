import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";

const AroundMeScreen = ({ navigation }) => {
  const [latitude, setLatitude] = useState(48.856614);
  const [longitude, setLongitude] = useState(2.3522219);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const askPermissionAndGetCoords = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          // const { coords } = await Location.getCurrentPositionAsync();
          // setLatitude(coords.latitude);
          // setLongitude(coords.longitude);
          // latitude = coords.latitude
          // longitude = coords.longitude

          const { data } = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${latitude}&longitude=${longitude}`
          );
          setData(data);
          setIsLoading(false);
        } else {
          alert("Permission denied");
        }
      } catch (error) {
        console.log("catch >> ", error.response);
      }
    };

    askPermissionAndGetCoords();
  }, []);

  return isLoading ? (
    <View>
      <ActivityIndicator size="large" style={styles.activityCenter} />
    </View>
  ) : (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      {data.map((coords) => {
        return (
          <Marker
            key={coords._id}
            coordinate={{
              latitude: coords.location[1],
              longitude: coords.location[0],
            }}
            onPress={() => {
              navigation.navigate("Room", { _id: coords._id });
            }}
          />
        );
      })}
    </MapView>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({
  activityCenter: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
