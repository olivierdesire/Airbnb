import { Image, StyleSheet } from "react-native";

const LogoImage = () => {
  return (
    <Image style={styles.logoImage} source={require("../assets/airbnb.png")} />
  );
};

export default LogoImage;

const styles = StyleSheet.create({
  logoImage: {
    height: 50,
    width: 30,
    resizeMode: "contain",
  },
});
