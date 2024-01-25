import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import MyStack from './src/navigations';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
  return (

    <GestureHandlerRootView style={{flex:1}}>
      <StatusBar
      animated={true}
        barStyle={'light-content'}
        backgroundColor={"black"}
      />
      <Provider store ={store}>
          <MyStack/>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;