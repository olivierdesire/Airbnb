import * as Location from "expo-location";

export const askPermissionAndGetCoords = async () => {
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
