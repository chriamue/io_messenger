import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import SettingsView from './SettingsView';
import {NavigationActions} from 'react-navigation';

export default connect(
  null,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(SettingsView);