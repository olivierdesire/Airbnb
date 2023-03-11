import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUpScreen({ setToken, navigation, setId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const CreateAccount = async () => {
    if (!email || !password || !password || !confirmPassword) {
      setErrorMessage("please fill all fields");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords must be the same");
    } else {
      try {
        const userToken = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          { email, username, description, password }
        );
        setId(userToken.data.id);
        setToken(userToken.data.token);
        alert("Account created");
      } catch (error) {
        setErrorMessage("email/password incorrect");
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView style={styles.container}>
        <View style={styles.logo}>
          <Image
            style={styles.imageLogo}
            source={require("../assets/airbnb.png")}
          />
          <Text style={styles.textLogo}>Sign up</Text>
        </View>
        <View>
          <TextInput
            style={styles.inputSign}
            value={email.toLowerCase()}
            placeholder="email"
            onChangeText={(text) => {
              setErrorMessage("");
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.inputSign}
            value={username}
            placeholder="username"
            onChangeText={(text) => {
              setErrorMessage("");
              setUsername(text);
            }}
          />
          <TextInput
            style={styles.inputSignDescribe}
            value={description}
            multiline={true}
            textAlignVertical="top"
            placeholder="Describe yourself in a few words"
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
          <TextInput
            style={styles.inputSign}
            value={password}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setErrorMessage("");
              setPassword(text);
            }}
          />
          <TextInput
            style={styles.inputSign}
            value={confirmPassword}
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setErrorMessage("");
              setConfirmPassword(text);
            }}
          />
          <View style={[styles.center, styles.buttonMargin]}>
            <Text style={styles.textFilled}> {errorMessage}</Text>
            <TouchableOpacity
              style={styles.buttonSign}
              onPress={async () => {
                CreateAccount();
              }}
            >
              <Text style={styles.textButtonSign}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonAlreadyAccount}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.textButtonAlreadyAccount}>
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  imageLogo: {
    height: 100,
    width: 90,
    resizeMode: "contain",
  },
  textLogo: {
    color: "#717171",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
  },
  buttonMargin: {
    marginTop: 50,
  },
  inputSign: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    marginHorizontal: 30,
    paddingVertical: 10,
  },
  flexStart: {
    justifyContent: "flex-start",
  },

  inputSignDescribe: {
    height: 90,
    marginTop: 40,
    borderWidth: 1,
    borderColor: "red",
    marginHorizontal: 30,
    paddingVertical: 10,
    paddingLeft: 10,
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

  buttonAlreadyAccount: {
    marginTop: 20,
  },

  textButtonAlreadyAccount: {
    fontSize: 12,
    marginBottom: 50,
  },
  textFilled: {
    color: "red",
    marginBottom: 10,
  },
});
