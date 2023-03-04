import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";

const AroundMeScreen = ({ navigation }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const askPermissionAndGetCoords = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          const { coords } = await Location.getCurrentPositionAsync();
          setLatitude(coords.longitude);
          setLongitude(coords.longitude);

          const { data } = await axios.get(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around"
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
        latitude: 48.856614,
        longitude: 2.3522219,
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
            onPress={async () => {
              navigation.navigate("Room", { _id: coords._id });
            }}
          ></Marker>
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
