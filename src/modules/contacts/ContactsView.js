import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, ScrollView, View} from 'react-native';
import {Icon, Card} from 'react-native-elements';

const Contacts = require('react-native-contacts');

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
        let allContacts = contacts;
        me.setState({allContacts});
        me.setState({
          loaded: true
        });
      }
    });
  }

  chat = (recipientName, recipientAddress) => {
    this.props.navigate({routeName: 'InfiniteChatStack', params: {recipientName: recipientName, recipientAddress: recipientAddress}});
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
                <TouchableOpacity onPress={this.chat.bind(this, contacts.givenName, 'address')} accessible={true}>
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
