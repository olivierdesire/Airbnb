import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const test = false;

  return (
    <KeyboardAwareScrollView>
      <View>
        <View style={styles.logo}>
          <Image
            style={styles.imageLogo}
            source={require("../assets/airbnb.png")}
          />
          <Text style={styles.textLogo}>Sign in</Text>
        </View>
        <View>
          <TextInput
            style={styles.inputSign}
            value={email}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.inputSign}
            value={password}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <View style={[styles.center, styles.buttonMargin]}>
            <Text style={test ? styles.textFilled : styles.noTextFilled}>
              Please fill all fields
            </Text>
            <TouchableOpacity
              style={styles.buttonSign}
              onPress={async () => {
                const userToken = "secret-token";
                setToken(userToken);
              }}
            >
              <Text style={styles.textButtonSign}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonCreateAccount}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.textButtonCreateAccount}>
                No account ? Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  imageLogo: {
    height: 100,
    width: 90,
  },
  textLogo: {
    color: "#717171",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 100,
  },
  buttonMargin: {
    marginTop: 130,
  },
  inputSign: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    marginHorizontal: 30,
    paddingVertical: 10,
  },
  buttonSign: {
    borderWidth: 3,
    borderColor: "red",
    width: 200,
    borderRadius: 50,
    alignItems: "center",
    padding: 20,
  },
  textButtonSign: {
    color: "#717171",
    fontSize: 15,
    fontWeight: "bold",
  },

  buttonCreateAccount: {
    marginTop: 20,
  },

  textButtonCreateAccount: {
    fontSize: 12,
  },
  textFilled: {
    color: "red",
  },
  noTextFilled: {
    backfaceVisibility: "hidden",
  },
});
