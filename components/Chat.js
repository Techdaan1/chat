import React from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";

// const firebase = require("firebase");
// require("firebase/firestore");

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
    };
  }

  componentDidMount() {
    //Set name to name selected on start page
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: "This is a system message",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  // Make sure messages are sent
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  // handles the background color of the chat bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#FF7777",
          },
          left: {
            backgroundColor: "#AFEEEE",
          },
        }}
      />
    );
  }

  render() {
    //Set bgcolor to color selected on start page
    let bgColor = this.props.route.params.bgColor;
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: bgColor,
            width: "100%",
            height: "100%",
          }}
        >
          <View style={styles.giftedChat}>
            <GiftedChat
              renderBubble={this.renderBubble.bind(this)}
              messages={this.state.messages}
              onSend={(messages) => this.onSend(messages)}
              user={{
                _id: 1,
                name: this.state.name,
              }}
            />

            {Platform.OS === "android" ? (
              <KeyboardAvoidingView behavior="height" />
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  giftedChat: {
    flex: 1,
    width: "88%",
    paddingBottom: 10,
    justifyContent: "center",
    borderRadius: 5,
  },
});
