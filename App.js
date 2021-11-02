import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import { store,persistor } from './src/redux/Store/Store';
import AppNavigator from './src/routes/Navigators';

export default function App(){
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator/>
      </PersistGate>
    </Provider>
  )
}