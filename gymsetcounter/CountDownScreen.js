import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Audio } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'expo';

export default class CountDownScreen extends React.Component {
  constructor(props) {
    super();
    this.sound = null;
    this.seconds = props.navigation.getParam('seconds', 0);
    this.numSets = 0;
    this.state = {
      time: {},
      seconds: this.seconds,
      isRunning: false,
      numSets: 0,
      isPaused: false,
      isLoading: false,
      shouldPlay: false,
      isPlaying: false,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.reset = this.reset.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentWillMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar, numSets: this.numSets });
  }

  startTimer() {
    let isRunning = this.state.isRunning;

    //case pause button clicked
    if (isRunning) {
      clearInterval(this.timer);
      this.setState({
        isRunning: false,
        isPaused: true,
      });
      return;
    }

    //case start button clicked
    if (
      !this.state.isPaused ||
      (this.state.isPaused && this.state.seconds > 0)
    ) {
      this.timer = setInterval(this.countDown, 1000);
      this.setState({
        isRunning: true,
      });
    }

    if (!this.state.isPaused) {
      this.setState({
        numSets: this.numSets++,
      });
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    /*if(seconds > 0 && seconds < 5) {
      this.playCountDownSound();
    }*/
    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);

      //this.playFinishSound();
      this.timer = 0;
      this.setState({
        time: this.secondsToTime(this.seconds),
        isPaused: false,
        isRunning: false,
        seconds: this.seconds,
      });
    }
  }

  reset() {
    if (this.state.isRunning) {
      clearInterval(this.timer);
    }
    this.numSets = 0;
    this.setState({
      time: this.secondsToTime(this.seconds),
      seconds: this.seconds,
      isRunning: false,
      numSets: 0,
      isPaused: false,
    });
  }

  async playFinishSound() {
    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync(require('./assets/alert.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  async playCountDownSound() {
    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync(require('./assets/button-16.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let time =
      this.state.time.m > 0
        ? this.state.time.m + ':' + this.state.time.s
        : this.state.time.s;
    return (
      <View style={styles.container}>
        <Text style={styles.numSet}>set: {this.numSets}</Text>
        <Text style={styles.counter}>{time}</Text>
        <Button
          buttonStyle={{
            backgroundColor: 'rgb(28, 184, 65)',
            width: Dimensions.get('window').width,
            height: 80,
            borderColor: 'transparent',
            borderWidth: 0,
            fontSize: 150,
            margin: 0,
            padding: 0,
            fontWeight: 'bold',
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0 }}
          onPress={() => this.startTimer()}
          title={!this.state.isRunning ? 'Start >' : 'Pause ||'}
        />
        <Button
          containerViewStyle={{ width: '100%', marginLeft: 0 }}
          onPress={() => this.reset()}
          title="Reset"
          buttonStyle={{
            backgroundColor: 'rgb(50, 0, 100)',
            width: Dimensions.get('window').width,
            height: 80,
            borderColor: 'transparent',
            borderWidth: 0,
            fontSize: 150,
            margin: 0,
            padding: 0,
          }}
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

  counter: {
    fontSize: 140,
    fontFamily: 'Impact, Charcoal, sans-serif',
    border: 'none',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#0066cc',
    width: Dimensions.get('window').width,
    height: 230,
    //flex: 4,
    //height: Dimensions.get('window').height - 250,
  },

  numSet: {
    WebkitBoxSizing: 'content-box',
    MozBoxSizing: 'content-box',
    boxSizing: 'content-box',
    padding: 20,
    fontSize: 40,
    fontFamily: 'Impact, Charcoal, sans-serif',
    border: 'none',
    color: '#ffcc00',
    textAlign: 'center',
    OTextOverflow: 'ellipsis',
    textOverflow: 'ellipsis',
    backgroundColor: '#000',
  },
});
