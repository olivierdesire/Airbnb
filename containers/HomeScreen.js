import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const stars = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator style={styles.activity} size="large" />
  ) : (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item) => String(item._id)}
      renderItem={({ item }) => (
        <>
          <TouchableOpacity
            onPress={navigation.navigate("Room", { _id: item._id })}
          >
            <Image style={styles.image} source={{ uri: item.photos[0].url }} />
          </TouchableOpacity>
          <View style={styles.relative}>
            <View style={styles.absolute}>
              <Text style={styles.price}>{item.price} €</Text>
            </View>
          </View>
          <View style={[styles.row, styles.marginDesc]}>
            <View style={styles.marginDesc}>
              <Text style={styles.textTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <View
                style={[
                  styles.row,
                  styles.flexStart,
                  styles.marginDesc,
                  styles.center,
                ]}
              >
                {stars.map((element, index) => {
                  if (index < item.ratingValue) {
                    return <Entypo name="star" size={24} color="#FFB000" />;
                  } else {
                    return <Entypo name="star" size={24} color="grey" />;
                  }
                })}
                <View style={styles.textReview}>
                  <Text>{item.reviews} reviews</Text>
                </View>
              </View>
            </View>
            <Image
              style={styles.avatar}
              source={{ uri: item.user.account.photo.url }}
            />
          </View>
          <View style={styles.lineTrough}></View>
        </>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  activity: {
    marginTop: 100,
  },
  container: {
    paddingTop: 10,
    marginHorizontal: 20,
  },
  image: {
    height: 200,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  marginDesc: {
    marginTop: 10,
  },
  textTitle: {
    fontSize: 17,
    width: 250,
  },
  relative: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
    bottom: 10,
    height: 40,
    width: 90,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    alignItems: "center",
  },

  price: {
    color: "white",
    fontSize: 18,
  },
  flexStart: {
    justifyContent: "flex-start",
  },
  textReview: {
    paddingLeft: 10,
  },
  lineTrough: {
    borderWidth: 0.3,
    color: "#EEEEEE",
    marginVertical: 20,
  },
});
