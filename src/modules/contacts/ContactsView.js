import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Image, Text, ScrollView, View} from 'react-native';
import {Container,Content,List,ListItem,Spinner} from 'native-base';
import {Button, FormLabel, FormInput, Icon} from 'react-native-elements'
import { Card } from 'react-native-material-design';

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
    this.state={
			allContacts:[],
			loaded: false
		}	
  }

  componentDidMount(){
		var me = this;
		Contacts.getAll((err, contacts) => {
		  if(err && err.type === 'permissionDenied'){
		  	console.log('permissionDenied',err);
		  } else {
		    console.log('contacts[0]:--- ',contacts);
		    let allContacts = contacts;
			me.setState({allContacts});
			me.setState({
				loaded: true
			})
		  }
		})
	}
	
	chat = () => {
    this.props.navigate({routeName: 'InfiniteChatStack'});
  };
  
  render(){
		if(!this.state.loaded){
			return this.renderLoadingView();
		}
		return(
			<View style={{ flex: 1 }}>
				<ScrollView>
					<View>
					 { this.state.allContacts.map((contacts) => (
			          <Card key={contacts.recordID} style={{ backgroundColor: 'whitesmoke', padding: 10, margin: 1 }}>
			            <Card.Body >
			              <Text>
			                {contacts.givenName + ' ' + contacts.familyName} 
			              </Text>
										<TouchableOpacity onPress={this.chat} accessible={true}>
											<Text>
											{contacts.phoneNumbers[0]?contacts.phoneNumbers[0].label === 'mobile' ? contacts.phoneNumbers[0].number : null :''}
										</Text>
        						</TouchableOpacity>
			            </Card.Body>
			          </Card>
	        		 )) }
	        		</View>
				</ScrollView>
			</View>
			)
	}

	renderLoadingView(){
		return(
			<View style={{ flex: 1 }}>
	        	<Text>Fetching... </Text>
	      	</View>
			)
	}

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row'
  },
  centeredContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFF'
  },
  headerOne: {
      fontSize: 32,
      fontWeight: '300',
      marginTop: 30
  }
});

export default ContactsView;