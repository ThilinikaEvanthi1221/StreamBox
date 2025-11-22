import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  USER_TOKEN: '@streambox_user_token',
  USER_DATA: '@streambox_user_data',
  FAVOURITES: '@streambox_favourites',
  THEME: '@streambox_theme',
};

// User authentication storage
export const storeUserToken = async (token) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);
    return true;
  } catch (error) {
    console.error('Error storing user token:', error);
    return false;
  }
};

export const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    return token;
  } catch (error) {
    console.error('Error getting user token:', error);
    return null;
  }
};

export const removeUserToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
    return true;
  } catch (error) {
    console.error('Error removing user token:', error);
    return false;
  }
};

// User data storage
export const storeUserData = async (userData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error storing user data:', error);
    return false;
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    return true;
  } catch (error) {
    console.error('Error removing user data:', error);
    return false;
  }
};

// Favourites storage
export const storeFavourites = async (favourites) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FAVOURITES, JSON.stringify(favourites));
    return true;
  } catch (error) {
    console.error('Error storing favourites:', error);
    return false;
  }
};

export const getFavourites = async () => {
  try {
    const favourites = await AsyncStorage.getItem(STORAGE_KEYS.FAVOURITES);
    return favourites ? JSON.parse(favourites) : [];
  } catch (error) {
    console.error('Error getting favourites:', error);
    return [];
  }
};

// Theme storage
export const storeTheme = async (isDark) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(isDark));
    return true;
  } catch (error) {
    console.error('Error storing theme:', error);
    return false;
  }
};

export const getTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
    return theme ? JSON.parse(theme) : false;
  } catch (error) {
    console.error('Error getting theme:', error);
    return false;
  }
};

// Clear all app data
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.FAVOURITES,
    ]);
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};
