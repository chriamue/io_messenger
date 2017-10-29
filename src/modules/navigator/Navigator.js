import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import ContactsViewContainer from '../contacts/ContactsViewContainer';
import ChatViewContainer from '../chat/ChatViewContainer';
import SettingsViewContainer from '../settings/SettingsViewContainer';

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Contacts: {screen: ContactsViewContainer},
  Settings: {screen: SettingsViewContainer}
}, {
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: activeColor,
        indicatorStyle: {backgroundColor: activeColor},
        style: {backgroundColor: headerColor}
      }
    })
  }
});

MainScreenNavigator.navigationOptions = {
  title: 'io Messenger',
  headerTitleStyle: {color: 'white'},
  headerStyle: {
    backgroundColor: headerColor,
    elevation: 0 // disable header elevation when TabNavigator visible
  }
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: MainScreenNavigator},
  InfiniteChatStack: {screen: ChatViewContainer}
});

export default AppNavigator;
