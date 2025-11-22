import axios from 'axios';

// DummyJSON Authentication API
const DUMMYJSON_BASE_URL = 'https://dummyjson.com';

// Local storage for registered users (simulated since DummyJSON doesn't persist)
let registeredUsers = [
  {
    id: 'demo-1',
    username: 'demo',
    email: 'demo@streambox.com',
    password: 'Demo123',
    firstName: 'Demo',
    lastName: 'User',
  },
];

// Login service using DummyJSON API
export const loginUser = async (email, password) => {
  try {
    // Check if it's a locally registered user first
    const localUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (localUser) {
      return {
        token: `local_token_${localUser.id}_${Date.now()}`,
        user: {
          id: localUser.id,
          username: localUser.username,
          email: localUser.email,
          firstName: localUser.firstName,
          lastName: localUser.lastName,
        },
      };
    }

    // Try DummyJSON authentication with username mapping
    // DummyJSON test credentials: username: emilys, password: emilyspass
    // Map common email patterns to DummyJSON usernames
    let username = email.split('@')[0];
    
    // Special mappings for DummyJSON test users
    const emailToUsernameMap = {
      'emily@example.com': 'emilys',
      'emilys@example.com': 'emilys',
      'michael@example.com': 'michaelw',
      'sophia@example.com': 'sophiab',
    };

    if (emailToUsernameMap[email.toLowerCase()]) {
      username = emailToUsernameMap[email.toLowerCase()];
    }

    const response = await axios.post(`${DUMMYJSON_BASE_URL}/auth/login`, {
      username: username,
      password: password,
      expiresInMins: 60,
    });

    const userData = {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
    };

    return {
      token: response.data.token,
      user: userData,
    };
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error('Invalid email or password');
    }
    throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
  }
};

// Register service (simulated - stores locally)
export const registerUser = async (username, email, password) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check if user already exists locally
  const existingUser = registeredUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() || 
           u.username.toLowerCase() === username.toLowerCase()
  );

  if (existingUser) {
    if (existingUser.email.toLowerCase() === email.toLowerCase()) {
      throw new Error('Email already registered');
    }
    if (existingUser.username.toLowerCase() === username.toLowerCase()) {
      throw new Error('Username already taken');
    }
  }

  // Create new user locally
  const newUser = {
    id: `user_${Date.now()}`,
    username,
    email,
    password,
    firstName: username,
    lastName: 'User',
  };

  registeredUsers.push(newUser);

  const token = `local_token_${newUser.id}_${Date.now()}`;
  const userData = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  };

  return { token, user: userData };
};

// Verify token using DummyJSON
export const verifyToken = async (token) => {
  try {
    // For local tokens, just validate format
    if (token.startsWith('local_token_')) {
      return { valid: true };
    }

    // Verify DummyJSON token
    const response = await axios.get(`${DUMMYJSON_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { valid: true, user: response.data };
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Logout (no API call needed)
export const logoutUser = async () => {
  return { success: true };
};

// Refresh token using DummyJSON
export const refreshToken = async (token) => {
  try {
    if (token.startsWith('local_token_')) {
      return { token };
    }

    const response = await axios.post(
      `${DUMMYJSON_BASE_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { token: response.data.token };
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};
