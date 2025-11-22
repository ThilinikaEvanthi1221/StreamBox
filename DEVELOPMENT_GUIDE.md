# StreamBox - Development Guide

## 🚀 Quick Start

### Running the Application

1. **Start the Metro Bundler**

   ```bash
   npm start
   # or
   npx expo start
   ```

2. **Choose your platform:**
   - Press `a` - Run on Android
   - Press `i` - Run on iOS
   - Press `w` - Run on Web
   - Scan QR code with Expo Go app

### Development Mode Options

```bash
# Start with cache cleared
npx expo start -c

# Start on specific platform
npx expo start --android
npx expo start --ios
npx expo start --web

# Start in tunnel mode (for testing on physical device)
npx expo start --tunnel
```

## 🏗️ Project Architecture

### State Management Flow

```
User Action → Component → Dispatch Redux Action → Update Store → Component Re-renders
```

**Example: Adding a Favourite**

1. User taps heart icon on MovieCard
2. MovieCard calls `onFavouritePress` prop
3. Parent screen dispatches `toggleFavourite(movie)` action
4. Redux updates favourites state
5. Change persisted to AsyncStorage
6. MovieCard re-renders with new favourite state

### Authentication Flow

```
1. User enters credentials → LoginScreen
2. Validate form → Yup validation
3. Call loginUser(email, password) → authService
4. Success → Dispatch loginSuccess(token, user)
5. Store token & user → AsyncStorage
6. Navigate to MainNavigator
```

### API Integration Pattern

```javascript
// 1. Define service function
export const fetchTrendingMovies = async (page = 1) => {
  const response = await apiClient.get("/trending/movie/week", {
    params: { page },
  });
  return response.data;
};

// 2. Call from component with Redux
const loadMovies = async () => {
  dispatch(fetchMoviesStart());
  try {
    const data = await fetchTrendingMovies();
    dispatch(fetchTrendingSuccess(data));
  } catch (err) {
    dispatch(fetchMoviesFailure(err.message));
  }
};
```

## 📁 File Structure Explanation

### Components (`src/components/`)

Reusable UI components used across multiple screens.

**When to create a component:**

- Used in 2+ screens
- Complex UI logic that can be isolated
- Needs to be testable independently

**Component naming:** PascalCase, descriptive (e.g., `MovieCard`, `LoadingSpinner`)

### Screens (`src/screens/`)

Full-screen views that users navigate between.

**Screen responsibilities:**

- Handle navigation
- Manage screen-level state
- Compose components
- Dispatch Redux actions

### Services (`src/services/`)

API calls and external integrations.

**Service pattern:**

```javascript
export const serviceName = async (params) => {
  try {
    const response = await apiClient.method(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error("User-friendly error message");
  }
};
```

### Redux (`src/redux/`)

Global state management with Redux Toolkit.

**Slice structure:**

- State: Initial state definition
- Reducers: Synchronous state updates
- Actions: Auto-generated from reducers

## 🔧 Common Development Tasks

### Adding a New Feature

**1. Plan the feature**

- Define user story
- Identify affected screens
- Determine state management needs

**2. Create necessary files**

```bash
# Component
src/components/FeatureName.js

# Screen (if needed)
src/screens/FeatureScreen.js

# Redux slice (if needed)
src/redux/featureSlice.js

# Service (if API needed)
src/services/featureService.js
```

**3. Implement following this order**

- Constants and types
- Redux slice (if needed)
- Service functions
- Components
- Screens
- Navigation

**4. Test the feature**

- Manual testing on Android/iOS
- Test edge cases
- Test error scenarios

### Adding a New Screen

1. **Create screen component**

   ```javascript
   // src/screens/NewScreen.js
   import React from "react";
   import { View, Text, StyleSheet } from "react-native";
   import { useSelector } from "react-redux";
   import { COLORS } from "../constants";

   const NewScreen = ({ navigation, route }) => {
     const isDark = useSelector((state) => state.theme.isDark);
     const colors = isDark ? COLORS.dark : COLORS.light;

     return (
       <View style={[styles.container, { backgroundColor: colors.background }]}>
         <Text style={[styles.text, { color: colors.text }]}>New Screen</Text>
       </View>
     );
   };

   const styles = StyleSheet.create({
     container: { flex: 1 },
     text: { fontSize: 16 },
   });

   export default NewScreen;
   ```

2. **Add to screens/index.js**

   ```javascript
   export { default as NewScreen } from "./NewScreen";
   ```

3. **Add to navigator**

   ```javascript
   // In appropriate navigator file
   import { NewScreen } from "../screens";

   <Stack.Screen name="NewScreen" component={NewScreen} />;
   ```

### Adding a New API Endpoint

1. **Define in constants**

   ```javascript
   // src/constants/api.js
   export const API_ENDPOINTS = {
     // ... existing endpoints
     NEW_ENDPOINT: "/new/endpoint",
   };
   ```

2. **Create service function**

   ```javascript
   // src/services/yourService.js
   import apiClient from "./api";
   import { API_ENDPOINTS } from "../constants";

   export const fetchNewData = async (params) => {
     try {
       const response = await apiClient.get(API_ENDPOINTS.NEW_ENDPOINT, {
         params,
       });
       return response.data;
     } catch (error) {
       throw new Error("Failed to fetch data");
     }
   };
   ```

3. **Use in component with Redux**
   ```javascript
   const loadData = async () => {
     dispatch(fetchDataStart());
     try {
       const data = await fetchNewData(params);
       dispatch(fetchDataSuccess(data));
     } catch (err) {
       dispatch(fetchDataFailure(err.message));
     }
   };
   ```

### Adding Theme Support to New Components

```javascript
import { useSelector } from "react-redux";
import { COLORS } from "../constants";

const MyComponent = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Content</Text>
    </View>
  );
};
```

## 🐛 Debugging Tips

### Redux State Inspection

Install Redux DevTools:

```bash
npm install --save-dev @redux-devtools/extension
```

View state in console:

```javascript
// In any component
import { useSelector } from "react-redux";
const state = useSelector((state) => state);
console.log("Redux State:", state);
```

### Network Requests

Check API calls:

```javascript
// In src/services/api.js interceptors
console.log("Request:", config);
console.log("Response:", response);
```

### AsyncStorage

View stored data:

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

const debugStorage = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const data = await AsyncStorage.multiGet(keys);
  console.log("AsyncStorage:", data);
};
```

### Navigation Debug

```javascript
// In any screen
console.log("Current Route:", route.name);
console.log("Navigation State:", navigation.getState());
```

## 🧪 Testing Strategies

### Manual Testing Checklist

**Authentication:**

- [ ] Register with valid data
- [ ] Register with invalid data (each field)
- [ ] Login with correct credentials
- [ ] Login with wrong credentials
- [ ] Session persists after app restart
- [ ] Logout clears session

**Navigation:**

- [ ] All tab buttons work
- [ ] Back button works correctly
- [ ] Deep linking to movie details
- [ ] Navigation state persists

**Data Loading:**

- [ ] Movies load on home screen
- [ ] Pull-to-refresh works
- [ ] Error handling displays correctly
- [ ] Loading states show appropriately
- [ ] Empty states display

**Favourites:**

- [ ] Add to favourites
- [ ] Remove from favourites
- [ ] Favourites persist after restart
- [ ] Favourites screen updates immediately
- [ ] Favourites visible across screens

**Theme:**

- [ ] Toggle dark mode
- [ ] Theme persists after restart
- [ ] All screens support both themes
- [ ] Colors are appropriate

## 🔐 Security Best Practices

### Storing Sensitive Data

```javascript
// ✅ GOOD - Use AsyncStorage for tokens
await AsyncStorage.setItem("@secure_token", token);

// ❌ BAD - Don't store passwords
// Never store plain passwords
```

### API Keys

```javascript
// ✅ GOOD - Use environment variables
const API_KEY = process.env.TMDB_API_KEY;

// For now, in constants/api.js
// In production, use .env files
```

### Input Validation

```javascript
// ✅ GOOD - Always validate user input
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

await schema.validate(formData);
```

## 📦 Adding Dependencies

### Install package

```bash
# Regular dependency
npm install package-name

# Dev dependency
npm install --save-dev package-name

# Expo-compatible package
npx expo install package-name
```

### Update imports

```javascript
// If it's a UI component
import ComponentName from "package-name";

// If it's a utility
import { utilityFunction } from "package-name";
```

## 🎨 Styling Guidelines

### Use theme colors

```javascript
// ✅ GOOD
<Text style={{ color: colors.text }}>Text</Text>

// ❌ BAD
<Text style={{ color: '#000000' }}>Text</Text>
```

### Responsive sizing

```javascript
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Use percentages or ratios
const cardWidth = width * 0.9;
```

### StyleSheet over inline styles

```javascript
// ✅ GOOD
const styles = StyleSheet.create({
  container: { flex: 1 },
});

// ❌ BAD (for static styles)
<View style={{ flex: 1 }} />;
```

## 🚀 Performance Tips

### Optimize FlatList

```javascript
<FlatList
  data={movies}
  keyExtractor={(item) => item.id.toString()}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
  initialNumToRender={6}
/>
```

### Memoize expensive calculations

```javascript
import { useMemo } from "react";

const filteredMovies = useMemo(() => {
  return movies.filter((m) => m.rating > 7);
}, [movies]);
```

### Avoid unnecessary re-renders

```javascript
import { memo } from "react";

export default memo(MovieCard);
```

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Maintenance tasks

### Examples

```bash
git commit -m "feat(auth): add DummyJSON API integration"
git commit -m "fix(favourites): resolve persistence issue"
git commit -m "style(components): update MovieCard styling"
git commit -m "refactor(redux): simplify movies slice logic"
```

## 🆘 Troubleshooting

### Metro bundler won't start

```bash
# Clear cache
npx expo start -c

# Clear watchman
watchman watch-del-all

# Reset Metro
rm -rf node_modules/.cache
```

### Module not found errors

```bash
# Clear and reinstall
rm -rf node_modules
npm install
```

### iOS build issues

```bash
cd ios
pod install
cd ..
npx expo run:ios
```

### Android build issues

```bash
cd android
./gradlew clean
cd ..
npx expo run:android
```

## 📚 Useful Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TMDB API Docs](https://developers.themoviedb.org/3)
- [DummyJSON API](https://dummyjson.com/)

---

**Happy Coding! 🎉**
