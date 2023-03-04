import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";

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
          try {
            const { coords } = await Location.getCurrentPositionAsync();
            setLatitude(coords.longitude);
            setLongitude(coords.longitude);
          } catch (error) {
            console.log("catch >> ", error.response);
          }
        } else {
          alert("Permission denied");
        }
      } catch (error) {
        console.log("catch >> ", error.response);
      }
    };

    askPermissionAndGetCoords();

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around"
        );
        setData(data);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const handleSubmit = async (latitude, longitude) => {
    try {
      const { data } = await axios.get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${latitude}&longitude=${longitude}`
      );
      return data[0]._id;
    } catch (error) {
      console.log(error.response);
    }
  };

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
              const responseId = await handleSubmit(
                coords.location[1],
                coords.location[0]
              );
              navigation.navigate("Room", { _id: responseId });
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
