import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';

import Icon from 'react-native-vector-icons/MaterialIcons';

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
    recipient: PropTypes.string.isRequired,
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
    this.props.chatStateActions.receiveMessage();
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
  }

  sendMessage = (text) => {
    this.props.chatStateActions.sendMessage(text);
  };

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    this.sendMessage(messages[0].text);
  }

  render() {
    return (
      <View style={[styles.container]}>
      <Text style={styles.linkButton}>
          Welcome, {this.props.seed}!
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
