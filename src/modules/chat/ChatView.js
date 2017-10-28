import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';

import Icon from 'react-native-vector-icons/MaterialIcons';
const iota = require('../../services/iota.js');

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class ChatView extends Component {
  static displayName = 'ChatView';

  static navigationOptions = {
    title: 'Chat!',
    tabBarIcon: (props) => (
      <Icon name='plus-one' size={24} color={props.tintColor} />
    )
  }

  static propTypes = {
    seed: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    recipientAddress: PropTypes.string.isRequired,
    recipientName: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    chatStateActions: PropTypes.shape({
      sendMessage: PropTypes.func.isRequired,
      receiveMessage: PropTypes.func.isRequired
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  state = {
    messages: []
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png'
          }
        }
      ]
    });
    this.receiveMessages();
  }

  async receiveMessages() {
    var messages = await iota.getMessages(this.props.seed, this.props.address);
    var msgs = [];
    messages.forEach((message) => {
      console.log(message);
      this.messages.push({
        _id: msgs.length,
        text: message.message,
        createdAt: message.time,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png'
        }
      });
    });
  }

  sendMessage = (text) => {
    this.props.chatStateActions.sendMessage(text);
  };

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    iota.sendMessage(this.props.seed, this.props.address, this.props.recipient, messages[0].text);
  }

  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;
    console.log('render', this.props.loading, this.props.messages);
    return (
      <View style={[styles.container]}>
        <Text style={[styles.linkButton, loadingStyle]}>
          Chat with {this.props.recipientName}!
        </Text>
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default ChatView;
