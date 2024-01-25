import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookingList from '../screens/bookingList';
import BookingScreen from '../screens/bookingScreen';
import SplashScreen from '../screens/splashScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown:false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        <Stack.Screen name="BookingList" component={BookingList} options={{
          headerShown: true,
          title: 'Booking List',
          headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: 'white', 
          },
          headerTintColor: 'black', 
          headerTitleStyle: {
            fontSize: 16, 
          },
        }}/>
        <Stack.Screen name="Booking" component={BookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;