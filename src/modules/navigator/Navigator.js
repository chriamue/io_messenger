import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import ContactsViewContainer from '../contacts/ContactsViewContainer';
import CounterViewContainer from '../counter/CounterViewContainer';
import ColorViewContainer from '../colors/ColorViewContainer';
import ChatViewContainer from '../chat/ChatViewContainer';
import SettingsViewContainer from '../settings/SettingsViewContainer';

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  //Chat: {screen: ChatViewContainer},
  Contacts: {screen: ContactsViewContainer},
  Counter: {screen: CounterViewContainer},
  Settings: {screen: SettingsViewContainer}
  //Color: {screen: ColorViewContainer}
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
  InfiniteColorStack: {screen: ColorViewContainer},
  InfiniteChatStack: {screen: ChatViewContainer}
});

export default AppNavigator;
