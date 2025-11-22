# StreamBox - Development Guide

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Key Features Implementation](#key-features-implementation)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Navigation](#navigation)
8. [Styling & Theming](#styling--theming)
9. [Testing Guide](#testing-guide)
10. [Troubleshooting](#troubleshooting)

## 📱 Project Overview

StreamBox is a feature-rich movie browsing application built with:

- **React Native** via Expo
- **Redux Toolkit** for state management
- **React Navigation** for routing
- **TMDB API** for movie data
- **AsyncStorage** for data persistence

## 🚀 Getting Started

### Running the App

1. **Start Metro bundler:**

   ```bash
   npm start
   ```

2. **Run on different platforms:**

   - Android: Press `a` or run `npm run android`
   - iOS: Press `i` or run `npm run ios`
   - Web: Press `w` or run `npm run web`

3. **Using Expo Go:**
   - Install Expo Go on your phone
   - Scan the QR code from terminal
   - App will load on your device

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.js       # Custom button with variants
│   ├── Input.js        # Form input with validation
│   ├── MovieCard.js    # Movie display card
│   ├── LoadingSpinner.js
│   └── ErrorMessage.js
│
├── screens/            # Application screens
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   ├── MovieDetailsScreen.js
│   ├── FavouritesScreen.js
│   └── ProfileScreen.js
│
├── navigation/         # Navigation setup
│   ├── RootNavigator.js    # Main navigator
│   ├── AuthNavigator.js    # Auth flow
│   └── MainNavigator.js    # Tab navigation
│
├── redux/             # State management
│   ├── store.js           # Redux store configuration
│   ├── authSlice.js       # Authentication state
│   ├── moviesSlice.js     # Movies state
│   ├── favouritesSlice.js # Favourites state
│   └── themeSlice.js      # Theme state
│
├── services/          # API services
│   ├── api.js            # Axios configuration
│   ├── authService.js    # Mock auth API
│   └── movieService.js   # TMDB API calls
│
├── utils/             # Utility functions
│   ├── validation.js     # Yup schemas
│   └── storage.js        # AsyncStorage helpers
│
└── constants/         # App constants
    ├── api.js           # API endpoints & keys
    └── colors.js        # Color schemes
```

## 🎯 Key Features Implementation

### 1. User Authentication

**Location:** `src/screens/LoginScreen.js`, `src/screens/RegisterScreen.js`

**Flow:**

1. User enters credentials
2. Validation with Yup schema
3. API call to auth service
4. Store token & user data in AsyncStorage
5. Update Redux state
6. Navigate to main app

**Code Example:**

```javascript
const handleLogin = async () => {
  dispatch(loginStart());
  try {
    const response = await loginUser(email, password);
    await storeUserToken(response.token);
    await storeUserData(response.user);
    dispatch(loginSuccess(response));
  } catch (err) {
    dispatch(loginFailure(err.message));
  }
};
```

### 2. Movie Browsing

**Location:** `src/screens/HomeScreen.js`

**Features:**

- Tab switching (Trending/Popular)
- Pull-to-refresh
- Search functionality
- Real-time filtering

**Implementation:**

```javascript
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

### 3. Favourites Management

**Location:** `src/redux/favouritesSlice.js`

**Flow:**

1. User taps heart icon
2. Toggle action dispatched
3. Update Redux state
4. Persist to AsyncStorage
5. UI updates automatically

**Code Example:**

```javascript
const handleFavouritePress = async (movie) => {
  dispatch(toggleFavourite(movieData));
  const updatedFavourites = /* compute new list */;
  await storeFavourites(updatedFavourites);
};
```

### 4. Dark Mode

**Location:** `src/redux/themeSlice.js`, `src/screens/ProfileScreen.js`

**Implementation:**

- Redux state for theme
- Persisted in AsyncStorage
- Colors object for light/dark
- Applied throughout app

## 🔄 State Management

### Redux Slices

**1. Auth Slice**

```javascript
{
  isAuthenticated: boolean,
  user: object,
  token: string,
  loading: boolean,
  error: string
}
```

**2. Movies Slice**

```javascript
{
  trendingMovies: array,
  popularMovies: array,
  movieDetails: object,
  searchResults: array,
  loading: boolean,
  error: string
}
```

**3. Favourites Slice**

```javascript
{
  items: array, // Array of movie objects
  loading: boolean
}
```

**4. Theme Slice**

```javascript
{
  isDark: boolean;
}
```

### Actions Usage

```javascript
// In components
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, toggleFavourite } from "../redux";

const dispatch = useDispatch();
const { user } = useSelector((state) => state.auth);

// Dispatch actions
dispatch(loginSuccess({ user, token }));
dispatch(toggleFavourite(movie));
```

## 🌐 API Integration

### TMDB API Setup

**Configuration:** `src/constants/api.js`

```javascript
export const BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_API_KEY = "your_api_key";
export const TMDB_ACCESS_TOKEN = "your_access_token";
```

### Available Endpoints

1. **Trending Movies**

   ```javascript
   GET / trending / movie / week;
   ```

2. **Popular Movies**

   ```javascript
   GET / movie / popular;
   ```

3. **Movie Details**

   ```javascript
   GET /movie/{movie_id}?append_to_response=credits,videos,similar
   ```

4. **Search Movies**
   ```javascript
   GET /search/movie?query={query}
   ```

### Making API Calls

```javascript
import { fetchTrendingMovies } from "../services";

// In component
useEffect(() => {
  const loadData = async () => {
    const data = await fetchTrendingMovies();
    // Handle response
  };
  loadData();
}, []);
```

## 🧭 Navigation

### Structure

```
RootNavigator
├── AuthNavigator (Stack)
│   ├── LoginScreen
│   └── RegisterScreen
│
└── MainNavigator (Tabs)
    ├── HomeStack
    │   ├── HomeScreen
    │   └── MovieDetailsScreen
    ├── FavouritesStack
    │   ├── FavouritesScreen
    │   └── MovieDetailsScreen
    └── ProfileStack
        └── ProfileScreen
```

### Navigation Examples

```javascript
// Navigate to screen
navigation.navigate("MovieDetails", { movieId: 123 });

// Go back
navigation.goBack();

// Navigate to tab
navigation.navigate("Favourites");

// Access route params
const { movieId } = route.params;
```

## 🎨 Styling & Theming

### Theme System

**Location:** `src/constants/colors.js`

```javascript
export const COLORS = {
  light: {
    primary: "#E50914",
    background: "#FFFFFF",
    text: "#000000",
    // ...
  },
  dark: {
    primary: "#E50914",
    background: "#141414",
    text: "#FFFFFF",
    // ...
  },
};
```

### Using Theme

```javascript
const isDark = useSelector((state) => state.theme.isDark);
const colors = isDark ? COLORS.dark : COLORS.light;

<View style={{ backgroundColor: colors.background }}>
  <Text style={{ color: colors.text }}>Hello</Text>
</View>;
```

### Component Styling

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
```

## 🧪 Testing Guide

### Manual Testing Checklist

**Authentication:**

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Register new account
- [ ] Validation errors display
- [ ] Session persists after restart

**Home Screen:**

- [ ] Movies load on launch
- [ ] Search returns results
- [ ] Tab switching works
- [ ] Pull-to-refresh updates data
- [ ] Navigate to movie details

**Movie Details:**

- [ ] All information displays
- [ ] Images load correctly
- [ ] Cast section visible
- [ ] Favourite button works
- [ ] Back navigation works

**Favourites:**

- [ ] Add movie to favourites
- [ ] Remove from favourites
- [ ] Favourites persist
- [ ] Navigate from favourites

**Profile:**

- [ ] User info displays
- [ ] Dark mode toggle works
- [ ] Theme persists
- [ ] Logout clears data

**Theme:**

- [ ] Toggle between light/dark
- [ ] All screens respect theme
- [ ] Theme persists on restart

### Test Demo Credentials

```
Email: demo@streambox.com
Password: Demo123
```

## 🐛 Troubleshooting

### Common Issues

**1. App won't start**

```bash
# Clear cache
npx expo start -c

# Reinstall node modules
rm -rf node_modules
npm install
```

**2. API not working**

- Check API key in `src/constants/api.js`
- Verify internet connection
- Check TMDB API status

**3. AsyncStorage errors**

```bash
# Clear app data
# On Android: Settings > Apps > Expo Go > Storage > Clear Data
# On iOS: Delete and reinstall Expo Go
```

**4. Navigation issues**

- Ensure all navigators are properly wrapped
- Check screen names match exactly
- Verify navigation hierarchy

**5. Redux state not updating**

- Check action is dispatched
- Verify reducer handles action
- Use Redux DevTools to debug

### Debug Tips

**1. Enable Debug Mode**

```javascript
// In any component
console.log("Debug:", data);
```

**2. Check Redux State**

```javascript
const state = useSelector((state) => state);
console.log("Redux State:", state);
```

**3. Network Debugging**

- Open Developer Menu: Shake device or Cmd+D (iOS) / Cmd+M (Android)
- Select "Debug Remote JS"
- Open Chrome DevTools

**4. Performance Issues**

- Use React DevTools Profiler
- Check for unnecessary re-renders
- Optimize images (use smaller sizes)
- Implement pagination for lists

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TMDB API Docs](https://developers.themoviedb.org/3)

## 💡 Best Practices

1. **Code Organization**

   - Keep components small and focused
   - Use meaningful names
   - Group related functionality

2. **State Management**

   - Keep state as local as possible
   - Use Redux for global state only
   - Avoid unnecessary re-renders

3. **Performance**

   - Use FlatList for long lists
   - Implement pagination
   - Optimize images
   - Use memoization when needed

4. **Error Handling**

   - Always handle async errors
   - Show user-friendly messages
   - Log errors for debugging

5. **Security**
   - Never commit API keys
   - Validate all user input
   - Secure sensitive data

## 🔄 Git Workflow

**Feature Commits:**

```bash
git commit -m "feat: Add user authentication"
git commit -m "feat: Implement movie search"
git commit -m "feat: Add dark mode support"
git commit -m "fix: Fix favourites persistence"
git commit -m "style: Update movie card design"
```

## 📝 Code Standards

- Use functional components
- Use hooks for state and effects
- Follow ESLint rules
- Write descriptive comments
- Keep functions small and focused

---

**Happy Coding! 🚀**
