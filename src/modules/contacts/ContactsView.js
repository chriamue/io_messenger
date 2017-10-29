import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, TouchableOpacity, Text, ScrollView, View} from 'react-native';
import {Icon, Card} from 'react-native-elements';

const Contacts = require('react-native-contacts');
const request = require('superagent');

const env = require('../../../env.js');

class ContactsView extends Component {
  static displayName = 'ContactsView';

  static navigationOptions = {
    title: 'Contacts',
    tabBarIcon: () => (<Icon name='contacts' size={24} />)
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      allContacts: [],
      loaded: false
    };
  }

  componentDidMount() {
    var me = this;
    Contacts.getAll((err, contacts) => {
      if (err && err.type === 'permissionDenied') {
        console.log('contacts permissionDenied',err);
      } else {
        let allContacts = [];
        contacts.forEach((contact) => {
          if (contact.phoneNumbers[0]) {
            allContacts.push(contact);
          }
        });
        me.setState({allContacts});
        me.setState({
          loaded: true
        });
      }
    });
  }

  chat = (recipientName, recipientNumber) => {
    var url = env.dictionary_url + '/address/' + recipientNumber.replace(/\s/g, '');
    request.get(url).set('accept', 'json')
      .end((err, res) => {
        console.log(err);
        console.log(res);
        if (res && res.status === 200) {
          this.props.navigate({routeName: 'InfiniteChatStack', params: {recipientName: recipientName, recipientAddress: res.body.address}});
        } else {
          Alert.alert('Error getting address', recipientName + ' has no address');
        }
      });
  }

  renderLoadingView() {
    return (
      <View style={{flex: 1}}>
        <Text>Fetching... </Text>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View>
            { this.state.allContacts.map((contacts) => (
              <Card key={contacts.recordID} style={{backgroundColor: 'whitesmoke', padding: 10, margin: 1}}>
                <Text>
                  {contacts.givenName + ' ' + contacts.familyName}
                </Text>
                <TouchableOpacity onPress={this.chat.bind(this, contacts.givenName, contacts.phoneNumbers[0].number)} accessible={true}>
                  <Text>
                    {(contacts.phoneNumbers[0] ? (contacts.phoneNumbers[0].label === 'mobile' ? contacts.phoneNumbers[0].number : null) : '')}
                  </Text>
                </TouchableOpacity>
              </Card>
            )) }
          </View>
        </ScrollView>
      </View>
    );
  }

}

export default ContactsView;
