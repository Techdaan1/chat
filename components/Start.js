import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import backgroundImg from "../assets/bg-img.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", bgColor: "" };
  }

  //changes the state to the color picked from the provided colors by the user
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  //background color choices
  colors = {
    darkGreen: "#090C08",
    purpe: "#474056",
    gray: "#8A95A5",
    green: "#B9C6AE",
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
          <View style={styles.box}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputText}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder="Type your name here..."
              />
            </View>
            <View style={styles.colorBox}>
              <Text style={styles.colorText}>Pick a background color</Text>
              <View style={styles.colorList}>
                <TouchableOpacity
                  onPress={() => {
                    this.changeBgColor("#090C08");
                  }}
                  style={styles.darkGreen}
                ></TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.changeBgColor("#474056");
                  }}
                  style={styles.purple}
                ></TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.changeBgColor("#8A95A5");
                  }}
                  style={styles.gray}
                ></TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.changeBgColor("#B9C6AE");
                  }}
                  style={styles.green}
                ></TouchableOpacity>
              </View>
            </View>
            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Go to chat</Text>
            </Pressable>
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
    marginTop: 60,
    marginBottom: 150,
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
    textAlign: "center",
    paddingTop: 8,
  },

  inputBox: {
    marginTop: 30,
    marginBottom: 20,
    width: "80%",
    height: "15%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },

  button: {
    flexDirection: "column",
    backgroundColor: "#757083",
    width: "80%",
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
  },

  darkGreen: {
    backgroundColor: "#090C08",
    borderRadius: 20,
    width: 40,
    height: 40,
    marginHorizontal: 6,
    flexDirection: "row",
  },

  purple: {
    backgroundColor: "#474056",
    borderRadius: 20,
    width: 40,
    height: 40,
    marginHorizontal: 6,
    flexDirection: "row",
  },

  gray: {
    backgroundColor: "#8A95A5",
    borderRadius: 20,
    width: 40,
    height: 40,
    marginHorizontal: 6,
    flexDirection: "row",
  },

  green: {
    backgroundColor: "#B9C6AE",
    borderRadius: 20,
    width: 40,
    height: 40,
    marginHorizontal: 6,
    flexDirection: "row",
  },

  colorBox: {
    height: 100,
  },

  colorText: {
    fontSize: 16,
    color: "darkred",
    fontWeight: "100",
    textAlign: "center",
  },

  colorList: {
    flexDirection: "row",
    padding: 5,
    margin: 5,
  },

  box: {
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "auto",
    borderRadius: 25,
    flexDirection: "column",
    height: 320,
    width: 300,
  },
});
