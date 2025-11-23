import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '../components';
import { registerStart, registerSuccess, registerFailure } from '../redux';
import { registerUser } from '../services';
import { storeUserToken, storeUserData } from '../utils';
import { registerSchema, validateField } from '../utils';
import { COLORS } from '../constants';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = isDark ? COLORS.dark : COLORS.light;

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Failed', error);
    }
  }, [error]);

  const handleInputChange = async (field, value) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);

    // Real-time validation with full form context
    try {
      await registerSchema.validateAt(field, updatedFormData);
      setErrors({ ...errors, [field]: null });
    } catch (err) {
      setErrors({ ...errors, [field]: err.message });
    }
  };

  const validateForm = async () => {
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleRegister = async () => {
    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    dispatch(registerStart());

    try {
      const response = await registerUser(
        formData.username,
        formData.email,
        formData.password
      );

      // Don't auto-login, just show success and navigate to login
      dispatch(registerSuccess(response));

      Alert.alert(
        'Success',
        'Your account has been created successfully! Please log in with your credentials.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            }
          }
        ]
      );
    } catch (err) {
      dispatch(registerFailure(err.message));
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Sign up to get started
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Username"
              value={formData.username}
              onChangeText={(value) => handleInputChange('username', value)}
              placeholder="Enter your username"
              autoCapitalize="none"
              icon="user"
              error={errors.username}
            />

            <Input
              label="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail"
              error={errors.email}
            />

            <Input
              label="Password"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              icon="lock"
              rightIcon={showPassword ? 'eye-off' : 'eye'}
              onRightIconPress={() => setShowPassword(!showPassword)}
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              placeholder="Confirm your password"
              secureTextEntry={!showConfirmPassword}
              icon="lock"
              rightIcon={showConfirmPassword ? 'eye-off' : 'eye'}
              onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
              error={errors.confirmPassword}
            />

            <Button
              title="Sign Up"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.linkText, { color: colors.primary }]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 80, // Lower the signup body
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;
