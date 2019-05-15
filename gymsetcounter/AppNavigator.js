import { createStackNavigator } from 'react-navigation';
import CountDownScreen from './CountDownScreen';
import CustomTimeScreen from './CustomTimeScreen';
import TimeGridScreen from './TimeGridScreen';

const AppNavigator = createStackNavigator(
  {
    CountDown: { screen: CountDownScreen },
    CustomTime: { screen: CustomTimeScreen },
    TimeGrid: { screen: TimeGridScreen },
  },
  {
    initialRouteName: 'TimeGrid',
  }
);

export default AppNavigator;
