import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: false, // Set to true if supported by the animation type
    }).start(() => {
      // After the animation completes, navigate to the "Home" screen
      setTimeout(()=>{
      navigation.navigate('Booking');
      },2500)
    });
  }, [navigation, scaleValue]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.textStyle, { transform: [{ scale: scaleValue }] }]}>
        {"Booking App"}
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
  },
});