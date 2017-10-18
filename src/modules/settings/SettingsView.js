import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  ScrollView,
  View
} from 'react-native';
import {Card} from 'react-native-elements';
import VersionNumber from 'react-native-version-number';
import Icon from 'react-native-vector-icons/MaterialIcons';

class SettingsView extends Component {
  static displayName = 'SettingsView';

  static navigationOptions = {
    title: 'Settings',
    tabBarIcon: () => (<Icon name='settings' size={24} />)
  }

  static propTypes = {
    seed: PropTypes.string.isRequired,
    settingsStateActions: PropTypes.shape({
      setSeed: PropTypes.func.isRequired
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  buildSeed = () => {
    return (
      <View>
      <Text>Seed</Text>
      <TextInput onChangeText={(text) => this.props.settingsStateActions.setSeed({text})} value={this.props.seed}/>
      </View>
    );
  }

  render() {
    const seed = this.buildSeed();
    return (
      <ScrollView>
      <View>
        <Text size='sm'>{'App version: ' + VersionNumber.appVersion}</Text>
      </View>
      <View>
        <Card title='IOTA'>
         {seed}
        </Card>
      </View>
    </ScrollView>
    );
  }
}

export default SettingsView;
