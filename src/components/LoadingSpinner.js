import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';

const LoadingSpinner = ({ size = 'large', style }) => {
  const isDark = useSelector(state => state.theme.isDark);
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingSpinner;
