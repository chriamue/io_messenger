import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  ScrollView,
  View
} from 'react-native';
import {Button, Card, FormLabel, FormInput} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
const env = require('../../../env.js');
const iota = require('../../services/iota.js');
const request = require('superagent');

import PhoneInput from 'react-native-phone-input';

class SettingsView extends Component {
  static displayName = 'SettingsView';

  static navigationOptions = {
    title: 'Settings',
    tabBarIcon: () => (<Icon name='settings' size={24} />)
  }

  static propTypes = {
    seed: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phonenr: PropTypes.string.isRequired,
    settingsStateActions: PropTypes.shape({
      setSeed: PropTypes.func.isRequired,
      setPhoneNr: PropTypes.func.isRequired,
      setAddress: PropTypes.func.isRequired,
      genAddress: PropTypes.func.isRequired
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phone: '+44',
      confirmResult: null
    };
  }

  setSeed = (seed) => {
    this.props.settingsStateActions.setSeed(iota.fillSeed(seed));
  }

  setPhoneNr = (number) => {
    console.log('number', number);
    this.props.settingsStateActions.setPhoneNr('' + number);
  }

  generateAddress = () => {
    this.props.settingsStateActions.genAddress(this.props.seed);
  }

  addDictionary = () => {
    var url = env.dictionary_url + '/address/' + this.props.phonenr;
    request.put(url).send({address: this.props.address}).set('accept', 'json')
      .end((err, res) => {
        console.log(err);
        console.log(res);
      });
  }

  buildRecipient = () => {
    const {params} = this.props.navigation.state;
    var recipient = params.recipient;
  }

  buildSeed = () => {
    return (
      <View>
        <FormLabel>Seed</FormLabel>
        <FormInput onChangeText={this.setSeed} value={this.props.seed}/>
      </View>
    );
  }

  buildAddress = () => {
    return (
      <View>
        <Button
          raised
          icon={{name: 'cached'}}
          title='Generate Address' onPress={() => this.generateAddress() }/>
        <TextInput onChangeText={(text) => this.props.settingsStateActions.setAddress({text})} value={this.props.address}/>
      </View>
    );
  }

  render() {
    const seed = this.buildSeed();
    const address = this.buildAddress();
    return (
      <ScrollView>
        <View>
          <Text size='sm'>{'App version: '/* + VersionNumber.appVersion*/}</Text>
        </View>
        <View>
          <Card title='IOTA'>
            {seed}
            {address}
          </Card>
          <Card title='PhoneNr'>
            <PhoneInput initialCountry='de' value={this.props.phonenr} onChangePhoneNumber={this.setPhoneNr} />
          </Card>
          <Button
            raised
            icon={{name: 'cached'}}
            title='Add to Dictionary' onPress={() => this.addDictionary() }/>
        </View>
      </ScrollView>
    );
  }
}

export default SettingsView;
