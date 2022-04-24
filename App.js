/**
 * Giance News Feed App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import BottomTabFrame from './src/frame/BottomTabFrame';
import WelcomeScreen from './src/frame/WelcomeScreen';
import WebviewScreen from './src/webview/screen/WebviewScreen';
import LanguageScreen from './src/settings/screen/LanguageScreen';
import FontSizeScreen from './src/settings/screen/FontSizeScreen';
import SuggestionScreen from './src/settings/screen/SuggestionScreen';
import WatchListScreen from './src/watch/screen/WatchListScreen';
import { Root } from 'native-base';
import CompanyScreen from './src/company/screen/CompanyScreen';
import EventListScreen from './src/event/screen/EventListScreen';
import Colors from './src/common/Colors';
import {StatusBar} from 'react-native';

const RootStack = createStackNavigator(
    {
        Welcome: WelcomeScreen,
        Main: BottomTabFrame,
        Webview: WebviewScreen,
        Language: LanguageScreen,
        FontSize: FontSizeScreen,
        Suggestion: SuggestionScreen,
        WatchList: WatchListScreen,
        Company: CompanyScreen,
        EventList: EventListScreen
    },
    {
        initialRouteName: 'Company',
        headerMode: 'none',
        // headerStyle: {
        //     // alignSelf: 'center',
        //     textAlign: 'center',
        //     backgroundColor: Colors.darkBackground
        // },
    }
);

const AppContainer = createAppContainer(RootStack);

const App: () => React$Node = () => {
  return (
      <Root>
          <AppContainer />
          <StatusBar backgroundColor={Colors.darkBackground} />
      </Root>
  );
};
export default App;
