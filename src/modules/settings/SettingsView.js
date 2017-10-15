import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class SettingsView extends Component {
  static displayName = 'SettingsView';

  static navigationOptions = {
    title: 'Settings',
    tabBarIcon: () => (<Icon name='settings' size={24} />)
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.linkButton}>
          Settings!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

export default SettingsView;