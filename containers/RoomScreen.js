import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { askPermissionAndGetCoords } from "../utils/askPermissionAndGetCoords";

const RoomScreen = ({ route }) => {
  const { _id } = route.params;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const stars = [1, 2, 3, 4, 5];

  useEffect(() => {
    askPermissionAndGetCoords();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${_id}`
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
    <View>
      <Image style={styles.image} source={{ uri: data.photos[0].url }} />
      <View style={styles.relative}>
        <View style={styles.absolute}>
          <Text style={styles.price}>{data.price} €</Text>
        </View>
      </View>
      <View style={[styles.row, styles.marginDesc, styles.padding]}>
        <View style={styles.marginDesc}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {data.title}
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
              if (index < data.ratingValue) {
                return (
                  <Entypo key={index} name="star" size={24} color="#FFB000" />
                );
              } else {
                return (
                  <Entypo key={index} name="star" size={24} color="grey" />
                );
              }
            })}
            <View style={styles.textReview}>
              <Text>{data.reviews} reviews</Text>
            </View>
          </View>
        </View>
        <Image
          style={styles.avatar}
          source={{ uri: data.user.account.photo.url }}
        />
      </View>
      <Text
        numberOfLines={3}
        style={[styles.padding, styles.marginDesc, styles.TextDesc]}
      >
        {data.description}
      </Text>
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  image: {
    height: 300,
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
  price: {
    color: "white",
    fontSize: 18,
  },
  center: {
    alignItems: "center",
  },
  flexStart: {
    justifyContent: "flex-start",
  },
  textReview: {
    paddingLeft: 10,
  },
  padding: {
    paddingHorizontal: 20,
  },
  TextDesc: {
    fontSize: 13,
    lineHeight: 17,
  },
});
