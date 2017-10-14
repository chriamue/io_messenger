import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  View,
  StyleSheet
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

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
        <Icon name='color-lens' size={24} color={props.tintColor} />
      ),
    // TODO: move this into global config?
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#39babd'
    }
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  state = {
    messages: [],
  };

  constructor(props) {
    super(props);
  }

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
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <View style={[styles.container]}>
       <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ChatView;
