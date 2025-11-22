import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';

const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary', // primary, secondary, outline
  icon,
  iconPosition = 'left', // left, right
  fullWidth = true,
  style,
  textStyle,
  ...props
}) => {
  const isDark = useSelector(state => state.theme.isDark);
  const colors = isDark ? COLORS.dark : COLORS.light;

  const getButtonStyle = () => {
    const baseStyle = [styles.button];

    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }

    switch (variant) {
      case 'primary':
        baseStyle.push({ backgroundColor: colors.primary });
        break;
      case 'secondary':
        baseStyle.push({ backgroundColor: colors.secondary });
        break;
      case 'outline':
        baseStyle.push({
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.primary,
        });
        break;
      default:
        baseStyle.push({ backgroundColor: colors.primary });
    }

    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];

    if (variant === 'outline') {
      baseStyle.push({ color: colors.primary });
    } else {
      baseStyle.push({ color: '#FFFFFF' });
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : '#FFFFFF'} />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <Feather
              name={icon}
              size={20}
              color={variant === 'outline' ? colors.primary : '#FFFFFF'}
              style={styles.iconLeft}
            />
          )}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Feather
              name={icon}
              size={20}
              color={variant === 'outline' ? colors.primary : '#FFFFFF'}
              style={styles.iconRight}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
