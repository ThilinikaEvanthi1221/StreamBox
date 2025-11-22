import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { logout } from '../redux';
import { toggleTheme } from '../redux';
import { clearAllStorage, storeTheme } from '../utils';
import { COLORS } from '../constants';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: favourites } = useSelector((state) => state.favourites);
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = isDark ? COLORS.dark : COLORS.light;

  const handleThemeToggle = async (value) => {
    dispatch(toggleTheme());
    await storeTheme(value);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await clearAllStorage();
            dispatch(logout());
          },
        },
      ],
      { cancelable: true }
    );
  };

  const menuItems = [
    {
      id: 'theme',
      icon: isDark ? 'moon' : 'sun',
      title: 'Dark Mode',
      subtitle: isDark ? 'Enabled' : 'Disabled',
      action: 'toggle',
      value: isDark,
    },
    {
      id: 'favourites',
      icon: 'heart',
      title: 'My Favourites',
      subtitle: `${favourites.length} movies`,
      action: 'navigate',
      screen: 'Favourites',
    },
    {
      id: 'logout',
      icon: 'log-out',
      title: 'Logout',
      subtitle: 'Sign out of your account',
      action: 'logout',
      danger: true,
    },
  ];

  const handleMenuItemPress = (item) => {
    switch (item.action) {
      case 'navigate':
        navigation.navigate(item.screen);
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* User Info Card */}
      <View style={[styles.userCard, { backgroundColor: colors.card }]}>
        <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.username, { color: colors.text }]}>
            {user?.username || 'User'}
          </Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>
            {user?.email || 'user@example.com'}
          </Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              { backgroundColor: colors.card, borderBottomColor: colors.border },
            ]}
            onPress={() => item.action !== 'toggle' && handleMenuItemPress(item)}
            activeOpacity={item.action === 'toggle' ? 1 : 0.7}
          >
            <View style={styles.menuItemLeft}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: item.danger
                      ? `${colors.error}20`
                      : `${colors.primary}20`,
                  },
                ]}
              >
                <Feather
                  name={item.icon}
                  size={20}
                  color={item.danger ? colors.error : colors.primary}
                />
              </View>
              <View style={styles.menuItemText}>
                <Text
                  style={[
                    styles.menuItemTitle,
                    { color: item.danger ? colors.error : colors.text },
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
                  {item.subtitle}
                </Text>
              </View>
            </View>

            {item.action === 'toggle' ? (
              <Switch
                value={item.value}
                onValueChange={handleThemeToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            ) : (
              <Feather name="chevron-right" size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={[styles.appInfoText, { color: colors.textSecondary }]}>
          StreamBox v1.0.0
        </Text>
        <Text style={[styles.appInfoText, { color: colors.textSecondary }]}>
          © 2024 StreamBox. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  menuContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 13,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appInfoText: {
    fontSize: 12,
    marginBottom: 4,
  },
});

export default ProfileScreen;
