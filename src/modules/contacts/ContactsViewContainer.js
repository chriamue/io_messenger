import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import ContactsView from './ContactsView';
import * as ContactsStateActions from '../contacts/ContactsState';

export default connect(
  state => ({
  }),
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       contactsStateActions: bindActionCreators(ContactsStateActions, dispatch)
     };
   }
)(ContactsView);