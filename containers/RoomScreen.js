import { View, Text } from "react-native";

const RoomScreen = ({ route }) => {
  return (
    <View>
      <Text>RoomScreen : {route.params.id}</Text>
    </View>
  );
};

export default RoomScreen;
