import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { restoreAuth, setFavourites, setTheme } from '../redux';
import { getUserToken, getUserData, getFavourites, getTheme } from '../utils';
import { COLORS } from '../constants';

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = isDark ? COLORS.dark : COLORS.light;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Restore theme
      const savedTheme = await getTheme();
      dispatch(setTheme(savedTheme));

      // Restore auth
      const token = await getUserToken();
      const user = await getUserData();

      if (token && user) {
        dispatch(restoreAuth({ token, user }));

        // Restore favourites
        const savedFavourites = await getFavourites();
        dispatch(setFavourites(savedFavourites));
      }
    } catch (error) {
      console.error('Error restoring auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;
