import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
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

const data = [
  { key: '30', value: "30''" },
  { key: '45', value: "45''" },
  { key: '60', value: "1'" },
  { key: '90', value: "1':30''" },
  { key: '120', value: "2'" },
  { key: '150', value: "2':30''" },
  { key: '180', value: "3'" },
  { key: '210', value: "3':30''" },
  { key: 'custom', value: 'Custom' },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;
export default class TimeGridScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'SetCounter - Time Selection',
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    if (item.key == 'custom') {
      return (
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CustomTime')}>
            <Text style={styles.itemText}>{item.value}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('CountDown', { seconds: item.key })
          }>
          <Text style={styles.itemText}>{item.value}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={formatData(data, numColumns)}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
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

  item: {
    backgroundColor: '#0066cc',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').height / numColumns - 50, // approximate a square
  },

  itemInvisible: {
    backgroundColor: 'transparent',
  },

  itemText: {
    color: '#fff',
    fontSize: 30,
  },
});
