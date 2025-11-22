import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/redux';
import { RootNavigator } from './src/navigation';

const AppContent = () => {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style={isDark ? 'light' : 'dark'} translucent={false} backgroundColor={isDark ? '#000' : '#fff'} />
        <RootNavigator />
      </View>
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
