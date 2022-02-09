import React from "react";
import {
  GiftedChat,
  Bubble,
  renderInputToolbar,
} from "react-native-gifted-chat";
import { View, Platform, KeyboardAvoidingView, StyleSheet } from "react-native";

import "firebase/firestore";
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo, {
  NetInfoCellularGeneration,
} from "@react-native-community/netinfo";

const firebase = require("firebase");
require("firebase/firestore");

//web apps Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQne6jh0BRbyAlkgNRKYbzc1ddv4_T-F0",
  authDomain: "chat-3e533.firebaseapp.com",
  projectId: "chat-3e533",
  storageBucket: "chat-3e533.appspot.com",
  messagingSenderId: "410933622357",
  appId: "1:410933622357:web:37bf35c42cd74b30cc46dc",
  measurementId: "G-MBBL2ZCNRG",
};

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
    };

    // initializing firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // create reference to the Firestore messages collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.refMsgsUser = null;
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async getMessages() {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    //set name to name selected on start page
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    //Check if the user is off- or online
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        console.log("online");
      } else {
        console.log("offline");
      }
    });

    //listen to authentication events, sign in anonymously
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        },
      });
      // listens for updates in the collection
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
    this.refMsgsUser = firebase
      .firestore()
      .collection("messages")
      .where("uid", "==", this.state.uid);
  }

  // add a new message to the collection
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
    });
    this.getMessages();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages: messages,
    });
  };

  // stop listening to authentication and collection changes
  componentWillUnmount() {
    this.unsubscribe();
  }

  // Make sure messages are sent
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.saveMessages();
      }
    );
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

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
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
