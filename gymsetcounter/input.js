import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

class Inputs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      minutes: 0,
      isSubmitDisabled: true
    };

    this.handleSeconds = this.handleSeconds.bind(this);
    this.handleMinutes = this.handleMinutes.bind(this);
    this.setTime       = this.setTime.bind(this);
  }

  handleSeconds = text => {
    var seconds = text.replace(/[^0-9]/g, '');
    if (seconds > 59) {
      alert('only numbers between 0 and 59');
      seconds = 0;
    }
    var isSubmitDisabled = this.setState.seconds == 0 && this.setState.minutes == 0
    this.setState({ seconds: seconds, isSubmitDisabled:isSubmitDisabled });
  };

  handleMinutes = text => {
    var minutes = text.replace(/[^0-9]/g, '');
    if (minutes > 59) {
      alert('only numbers between 0 and 59');
      minutes = 0;
    }
    var isSubmitDisabled = this.setState.seconds == 0 && this.setState.minutes == 0
    this.setState({ minutes: minutes, isSubmitDisabled:isSubmitDisabled  });
  };

  setTime = (minutes, seconds) => {
    var totalSeconds = seconds*1;
    if (minutes > 0) {
      totalSeconds = totalSeconds + (60 * minutes);
      //console.log(totalSeconds);
    }
    if (minutes == 0 && totalSeconds == 0) {
      alert('please, set a value');
      return;
    }
    const { navigation } = this.props;
    navigation.navigate('CountDown', { seconds: totalSeconds });
  };

  render() {

    return (
      <View style={{ flexDirection: 'column', flex: 2 }}>
        <View style={styles.container}>
          <View style={{ width: Dimensions.get('window').width / 2 }}>
            <FormLabel labelStyle={styles.label}>Minutes</FormLabel>
            <FormInput
              inputStyle={styles.input}
              keyboardType="numeric"
              value={this.state.minutes}
              underlineColorAndroid="transparent"
              placeholder="0"
              maxLength={2}
              placeholderTextColor="#999"
              autoCapitalize="none"
              onChangeText={this.handleMinutes}
            />
            <FormValidationMessage />
          </View>
          <View style={{ width: Dimensions.get('window').width / 2 }}>
            <FormLabel labelStyle={styles.label}>Seconds</FormLabel>
            <FormInput
              inputStyle={styles.input}
              keyboardType="numeric"
              maxLength={2}
              value={this.state.seconds}
              underlineColorAndroid="transparent"
              placeholder="0"
              placeholderTextColor="#999"
              autoCapitalize="none"
              onChangeText={this.handleSeconds}
            />
            <FormValidationMessage />
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get('window').width,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.submitButton}
            disabled = {this.state.isSubmitDisabled}
            onPress={() =>
              this.setTime(this.state.minutes, this.state.seconds)
            }>
            <Text style={styles.submitButtonText}> Set Time </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Inputs;

const styles = StyleSheet.create({
  container: {
    height: 200,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
  input: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 80,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  label: {
    color: 'white',
    fontSize: 20,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#0066cc',
    padding: 10,
    height: 100,
    width: 150,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
});
