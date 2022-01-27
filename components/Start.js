import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";
import backgroundImg from "../assets/bg-img.png";

export default class Start extends React.Component {
  state = {
    name: "",
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImg}
          resizeMode="cover"
          style={styles.bgImg}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Chat app</Text>
          </View>
          <View>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({ name: text })}
              value={this.state.name}
              placeholder="Your name..."
            />
          </View>
          <View>
            <Button
              color="#757083"
              title="Go to Chat"
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                })
              }
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  bgImg: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },

  titleContainer: {
    marginTop: 40,
  },

  titleText: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "600",
    textAlign: "center",
  },
  title: {
    color: "blue",
  },

  inputText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
    margin: 50,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },

  darkGreen: {
    backgroundColor: "#090C08",
    borderRadius: 20,
  },

  purpe: {
    backgroundColor: "#474056",
  },

  gray: {
    backgroundColor: "#8A95A5",
  },

  green: {
    backgroundColor: "#B9C6AE",
  },
});
