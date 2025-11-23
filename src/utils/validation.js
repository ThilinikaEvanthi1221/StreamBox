import * as yup from 'yup';

// Login validation schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Registration validation schema
export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      const { password } = this.parent;
      if (!value) return true; // Don't show error if confirmPassword is empty
      return value === password;
    })
    .required('Please confirm your password'),
});

// Helper function to validate field
export const validateField = async (schema, field, value) => {
  try {
    await schema.validateAt(field, { [field]: value });
    return null; // No error
  } catch (error) {
    return error.message;
  }
};

// Helper function to validate entire form
export const validateForm = async (schema, values) => {
  try {
    await schema.validate(values, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.inner.forEach((err) => {
      errors[err.path] = err.message;
    });
    return { isValid: false, errors };
  }
};
