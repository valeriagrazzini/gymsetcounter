import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'expo';

import Inputs from './input';

export default class CustomTimeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'SetCounter - Custom Time Selection',
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Inputs navigation={this.props.navigation} />
        <AdMobBanner
          adSize="mediumRectangle"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          testDeviceID="EMULATOR"
          onAdFailedToLoad={error => console.error(error)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#000',
  },
});
