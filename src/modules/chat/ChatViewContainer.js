import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import ChatView from './ChatView';
import * as ChatStateActions from '../chat/ChatState';

const mapStateToProps = (state, ownProps) => {
  console.log('OWNPROPS', ownProps);
  //const recipient = ownProps.navigation.state.params.recipient;
  var params = ownProps.navigation.state.params ? ownProps.navigation.state.params : {recipientAddress: '', recipientName: ''};
  var recipientName = params.recipientName ? params.recipientName : '';
  var recipientAddress = params.recipientAddress ? params.recipientAddress : '';
  return {
    seed: state.getIn(['chat', 'seed']),
    address: state.getIn(['chat', 'address']),
    loading: state.getIn(['chat', 'loading']),
    recipientAddress: recipientAddress,
    recipientName: recipientName
  };
};

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      navigation: bindActionCreators(NavigationActions, dispatch),
      chatStateActions: bindActionCreators(ChatStateActions, dispatch)
    };
  }
)(ChatView);
