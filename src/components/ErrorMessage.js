import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';
import Button from './Button';

const ErrorMessage = ({ message, onRetry, style }) => {
  const isDark = useSelector(state => state.theme.isDark);
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <View style={[styles.container, style]}>
      <Feather name="alert-circle" size={48} color={colors.error} />
      <Text style={[styles.message, { color: colors.text }]}>
        {message || 'Something went wrong'}
      </Text>
      {onRetry && (
        <Button
          title="Try Again"
          onPress={onRetry}
          variant="outline"
          fullWidth={false}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 32,
  },
});

export default ErrorMessage;
