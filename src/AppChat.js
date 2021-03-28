import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput, ScrollView} from 'react-native';
import {io} from 'socket.io-client';

export default class AppChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: 'cc',
      chatMessages: [],
    };
  }

  componentDidMount() {
    this.socket = io('http://192.168.11.189:3000');
    this.socket.on('chat message', (msg) => {
      console.log(msg);
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    });
  }

  submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }
  render() {
    const chatMessages = this.state.chatMessages.map((chatMessage) => (
      <Text style={{color: 'green'}}>{chatMessage}</Text>
    ));
    return (
      <View style={styles.container}>
        {chatMessages}
        <View>
          <TextInput
            style={{height: 40, borderWidth: 2}}
            autoCorrect={false}
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={(chatMessage) => {
              this.setState({chatMessage});
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listMsg: {
    // height: 300,
  },
});
