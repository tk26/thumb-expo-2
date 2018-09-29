import React from 'react';

// imports related to redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './src/store';

//thumb imports
import { Spinner } from './src/components/common';
import  App_Startup  from './src/components/App_Startup';

const App = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <App_Startup />
        </PersistGate>
      </Provider>
    );
  };

export default App;
