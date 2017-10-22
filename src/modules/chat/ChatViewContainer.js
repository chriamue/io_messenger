import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import ChatView from './ChatView';
import * as ChatStateActions from '../chat/ChatState';

export default connect(
  state => ({
    seed: state.getIn(['chat', 'seed']),
    address: state.getIn(['chat', 'address']),
    recipient: state.getIn(['chat', 'recipient']),
    messages: state.getIn(['chat', 'messages']),
    loading: state.getIn(['chat', 'loading'])
  }),
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       chatStateActions: bindActionCreators(ChatStateActions, dispatch)
     };
   }
)(ChatView);
