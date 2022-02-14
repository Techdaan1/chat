import React from "react";
//import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Start from "./components/Start";
import Chat from "./components/Chat";
import CustomActions from "./components/CustomActions";

const Stack = createStackNavigator();

export default class App extends React.Component {
  // constructor(props) {
  // super(props);
  //  this.state = { text: "" };
  //}

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
