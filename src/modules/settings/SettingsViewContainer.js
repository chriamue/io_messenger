import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SettingsView from './SettingsView';
import {NavigationActions} from 'react-navigation';
import * as SettingsStateActions from '../settings/SettingsState';

export default connect(
  state => ({
    seed: state.getIn(['settings', 'seed']),
    address: state.getIn(['settings', 'address']),
    phonenr: state.getIn(['settings', 'phonenr']),
    loading: state.getIn(['settings', 'loading'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      settingsStateActions: bindActionCreators(SettingsStateActions, dispatch)
    };
  }
)(SettingsView);
