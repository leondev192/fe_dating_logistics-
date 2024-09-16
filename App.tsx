// src/App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/contexts/AuthContext';
import RootNavigator from './src/navigations/RootNavigator';
import useNetworkStatus from './src/hooks/useNetworkStatus';

const App: React.FC = () => {
  useNetworkStatus();

  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
