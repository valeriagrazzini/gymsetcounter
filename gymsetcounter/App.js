import React from 'react';

import AppNavigator from './AppNavigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(AppNavigator);
class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}
export default AppContainer;
