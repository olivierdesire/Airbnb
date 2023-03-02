import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      data={data}
      keyExtractor={(item) => String(item._id)}
      renderItem={({ item }) => (
        // <Image source={{ uri: item.photos[0].url }} />
        <Text>{item.description}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  activity: {
    marginTop: 100,
  },
});
