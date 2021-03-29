import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  PanResponder
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function App() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [translateValue, setTranslateValue] = useState(
    new Animated.Value(height),
  );
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      translateValue.setValue(Math.max(0, 0 + gestureState.dy));
    },
    onPanResponderRelease: (e, gesture) => {
      const shouldOpen = gesture.vy <= 0;
      Animated.spring(translateValue, {
        toValue: shouldOpen ? 0 : height,
        velocity: gesture.vy,
        tension: 2,
        friction: 8,
        useNativeDriver: true,
      }).start();
    },
  });

  const togglePopup = shouldOpen => {
    let toValue = 0;
    if (!shouldOpen) {
      toValue = height;
    }
    Animated.spring(translateValue, {
      toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
      />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => togglePopup(true)}
          style={styles.button}
        >
          <Text>Open popup</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.popupContainer, {width}, {transform: [{translateY: translateValue}]}]}
      >
        <View style={styles.closeLine} />
        <Text>Swipe down to close 😁</Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EE9D11',
  },
  button: {
    padding: 20,
    backgroundColor: 'lightblue',
  },
  popupContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BFCACA',
    borderRadius: 10,
  },
  closeLine: {
    position: 'absolute',
    top: 30,
    width: '20%',
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'grey',
  },
});
