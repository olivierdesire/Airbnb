import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function SettingsScreen({ setToken, setId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [recupToken, setRecupToken] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarModified, setAvatarModified] = useState(false);
  const [userModified, setUserModified] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        const tokenSearch = await AsyncStorage.getItem("userToken");
        const userSearch = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenSearch}`,
            },
          }
        );
        setRecupToken(tokenSearch);
        setEmail(userSearch.data.email);
        setUsername(userSearch.data.username);
        setDescription(userSearch.data.description);
        if (userSearch.data.photo) {
          setAvatar(userSearch.data.photo.url);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("error>>> ", error);
      }
    };

    fetchUser();
  }, []);

  const accessLibrary = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        });
        // console.log("result>>>", result);
        if (!result.canceled) {
          setAvatar(result.assets[0].uri);
          setAvatarModified(true);
        } else {
          alert("Selection canceled");
        }
      } else {
        alert("Permission denied");
      }
    } catch (error) {
      console.log("error>>>", error);
    }
  };

  const accessCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync();
        console.log("result", result);
        if (!result.canceled) {
          setAvatar(result.assets[0].uri);
          setAvatarModified(true);
        } else {
          alert("Selection canceled");
        }
      } else {
        alert("Permission denied");
      }
    } catch (error) {
      console.log("error>>>", error);
    }
  };

  const updateInformation = async () => {
    try {
      setIsUpdating(true);
      // Edit User
      if (userModified) {
        const result = await axios.put(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
          { email: email, description: description, username: username },
          {
            headers: {
              Authorization: `Bearer ${recupToken}`,
            },
          }
        );
      }

      if (avatarModified) {
        const extension = avatar.split(".").pop();

        const formData = new FormData();
        formData.append("photo", {
          uri: avatar,
          name: `my-pict.${extension}`,
          type: `image/${extension}`,
        });

        const { data } = await axios.put(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${recupToken}`,
            },
          }
        );
        setAvatar(data.photo.url);
      }

      if (userModified || avatarModified) {
        alert("profile updated");
      }
    } catch (error) {
      console.log("error>>>", error);
    }
    setIsUpdating(false);
  };

  return isLoading ? (
    <View>
      <ActivityIndicator size="large" style={styles.activityCenter} />
    </View>
  ) : (
    <View style={styles.contain}>
      <View style={[styles.row, styles.center, styles.marginAvatar]}>
        <View style={styles.avatar}>
          {!avatar ? (
            <FontAwesome5
              style={styles.contentAvatar}
              name="user-alt"
              size={100}
              color="#E7E7E7"
            />
          ) : (
            <Image source={{ uri: avatar }} style={styles.imageAvatar} />
          )}
        </View>
        <View style={styles.marginIcons}>
          <MaterialIcons
            style={styles.icons}
            name="photo-library"
            size={30}
            color="#717171"
            onPress={accessLibrary}
          />
          <MaterialIcons
            name="photo-camera"
            size={30}
            color="#717171"
            onPress={accessCamera}
          />
        </View>
      </View>
      <TextInput
        style={styles.inputSign}
        value={email.toLowerCase()}
        placeholder="email"
        onChangeText={(text) => {
          setEmail(text);
          setUserModified(true);
        }}
      />
      <TextInput
        style={styles.inputSign}
        value={username}
        placeholder="username"
        onChangeText={(text) => {
          setUsername(text);
          setUserModified(true);
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
          setUserModified(true);
        }}
      />
      <View style={[styles.center, styles.buttonMargin]}>
        {isUpdating ? (
          <ActivityIndicator
            style={[styles.buttonSign, styles.buttonMargin2]}
          />
        ) : (
          <TouchableOpacity
            style={[styles.buttonSign, styles.buttonMargin2]}
            onPress={updateInformation}
          >
            <Text>Update</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.buttonSign}
          onPress={() => {
            setToken(null);
            setId(null);
          }}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    marginHorizontal: 10,
  },
  activityCenter: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  marginAvatar: {
    marginTop: 30,
  },
  avatar: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: "red",
  },
  contentAvatar: {
    marginLeft: 35,
    marginTop: 30,
  },
  imageAvatar: {
    height: 170,
    width: 170,
    borderRadius: 85,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  marginIcons: {
    marginLeft: 20,
  },
  icons: {
    marginBottom: 40,
  },
  inputSign: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    marginHorizontal: 30,
    paddingVertical: 10,
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
    borderWidth: 2,
    borderColor: "red",
    width: 200,
    borderRadius: 50,
    alignItems: "center",
    padding: 15,
  },
  buttonMargin: {
    marginTop: 40,
  },
  buttonMargin2: {
    marginBottom: 20,
  },
});
