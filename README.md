# StreamBox - Movie Browsing App

A feature-rich React Native mobile application built with Expo for browsing trending movies, managing favourites, and exploring movie details using The Movie Database (TMDB) API.

## 🎯 Features

### ✅ Core Features

- **User Authentication**

  - Login and Registration with form validation using Yup
  - Dummy JSON/local authentication only (no real API calls)
  - Secure token-based authentication (local only)
  - Persistent login sessions

- **Home Screen**

  - Browse trending and popular movies
  - Real-time search functionality
  - Pull-to-refresh capability
  - Movie cards with ratings, release dates, and descriptions
  - Tab navigation between Trending and Popular

- **Movie Details**

  - Comprehensive movie information
  - High-quality backdrop and poster images
  - Cast and crew information
  - Genres, runtime, budget, and revenue
  - Add/remove from favourites

- **Favourites Management**

  - Mark movies as favourites
  - Persistent storage using AsyncStorage
  - Dedicated favourites screen
  - Quick access to favourite movies

- **User Profile**

  - User information display
  - Dark mode toggle
  - Logout functionality
  - Favourites count

- **Navigation**
  - Bottom tab navigation (Home, Favourites, Profile)
  - Stack navigation for detailed views
  - Smooth transitions and animations

### 🌟 Bonus Features

- **Dark Mode**
  - Full theme support (Light/Dark)
  - Persistent theme preference
  - Smooth theme transitions
  - Consistent color scheme across all screens

## 🏗️ Architecture & Best Practices

### Project Structure

```
StreamBox/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── MovieCard.js
│   │   ├── LoadingSpinner.js
│   │   └── ErrorMessage.js
│   ├── screens/             # Screen components
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── MovieDetailsScreen.js
│   │   ├── FavouritesScreen.js
│   │   └── ProfileScreen.js
│   ├── navigation/          # Navigation configuration
│   │   ├── RootNavigator.js
│   │   ├── AuthNavigator.js
│   │   └── MainNavigator.js
│   ├── redux/              # State management
│   │   ├── store.js
│   │   ├── authSlice.js
│   │   ├── moviesSlice.js
│   │   ├── favouritesSlice.js
│   │   └── themeSlice.js
│   ├── services/           # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── movieService.js
│   ├── utils/              # Utility functions
│   │   ├── validation.js
│   │   └── storage.js
│   ├── constants/          # App constants
│   │   ├── api.js
│   │   └── colors.js
│   └── styles/             # Global styles
└── App.js
```

### Design Patterns & Principles

- **Feature-based Architecture**: Organized by features for better maintainability
- **Separation of Concerns**: Business logic separated from UI components
- **Component Reusability**: Modular, reusable components
- **Centralized State Management**: Redux Toolkit for predictable state
- **Clean Code**: ESLint-ready code following best practices
- **Error Handling**: Comprehensive error handling throughout the app

### State Management

- **Redux Toolkit** for global state management
- Slices for auth, movies, favourites, and theme
- Async actions for API calls
- Persistent state with AsyncStorage

### Security Best Practices

- Secure token storage using AsyncStorage
- Password validation with strong requirements
- Environment-based API key management
- Input sanitization and validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Expo Go app on your mobile device (optional)

### Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd c:\Users\Thilinika\Desktop\Me\Mobile\StreamBox
   ```

2. **Install dependencies** (Already done)

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

   or

   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on your phone

## 📱 Authentication

Register your own account with:

- Username: minimum 3 characters, alphanumeric
- Email: valid email format
- Password: minimum 6 characters (must include uppercase, lowercase, and number)

Then login using your registered credentials. No test/demo emails are provided; each user manages their own login.

## 🔧 Technologies Used

### Core

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Redux Toolkit** - State management
- **AsyncStorage** - Local data persistence

### UI & Styling

- **Expo Vector Icons (Feather)** - Icon library
- **React Native Safe Area Context** - Safe area handling
- **Custom styled components** - Reusable UI components

### API & Data

- **Axios** - HTTP client
- **TMDB API** - Movie database API
- **Yup** - Form validation

### Development

- **Feature-based commits** - Organized Git history
- **Component-driven development** - Modular architecture
- **Type-safe validation** - Input validation with Yup

## 📡 API Integration

### TMDB API

The app uses The Movie Database (TMDB) API v3 for movie data:

- Base URL: `https://api.themoviedb.org/3`
- Authentication: Bearer token
- Endpoints used:
  - `/trending/movie/week` - Trending movies
  - `/movie/popular` - Popular movies
  - `/movie/{id}` - Movie details with credits and videos
  - `/search/movie` - Search movies

### DummyJSON API

Used for user authentication (demo purposes):

- Base URL: `https://dummyjson.com`
- Endpoints used:
  - `POST /auth/login` - User login
  - `GET /auth/me` - Get current user
  - `POST /auth/refresh` - Refresh token
- Note: Registration is handled locally as DummyJSON doesn't persist new users

## 🎨 UI/UX Features

- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Native animations for better UX
- **Pull-to-Refresh**: Refresh content with pull gesture
- **Loading States**: Visual feedback during async operations
- **Error Handling**: User-friendly error messages
- **Empty States**: Informative empty state designs
- **Accessibility**: Proper contrast ratios and touch targets

## 🔐 Security Features

- **Secure Storage**: Sensitive data stored securely
- **Token-based Auth**: JWT-like token authentication
- **Input Validation**: Real-time form validation
- **Password Requirements**: Strong password enforcement
- **Error Handling**: Graceful error handling without exposing sensitive data

## 📦 Key Dependencies

```json
{
  "@react-navigation/native": "^6.x",
  "@react-navigation/native-stack": "^6.x",
  "@react-navigation/bottom-tabs": "^6.x",
  "@reduxjs/toolkit": "^2.x",
  "react-redux": "^9.x",
  "@react-native-async-storage/async-storage": "^1.x",
  "axios": "^1.x",
  "yup": "^1.x",
  "@expo/vector-icons": "^14.x"
}
```

## 🧪 Testing the App

### Manual Testing Checklist

1. **Authentication**

   - ✅ Register new user
   - ✅ Login with credentials
   - ✅ Validation errors display correctly
   - ✅ Session persists after app restart

2. **Home Screen**

   - ✅ Movies load and display
   - ✅ Search functionality works
   - ✅ Tab switching (Trending/Popular)
   - ✅ Pull-to-refresh updates data

3. **Movie Details**

   - ✅ Full movie information displays
   - ✅ Images load correctly
   - ✅ Cast information visible
   - ✅ Favourite toggle works

4. **Favourites**

   - ✅ Add/remove favourites
   - ✅ Favourites persist after restart
   - ✅ Navigate to movie details from favourites

5. **Profile**
   - ✅ User information displays
   - ✅ Dark mode toggle works
   - ✅ Theme persists after restart
   - ✅ Logout functionality

## 🌙 Dark Mode

The app includes a fully functional dark mode:

- Toggle in Profile screen
- Persists across app restarts
- Consistent theming across all screens
- Smooth transitions between themes

## 📝 Validation Rules

### Registration

- **Username**: 3-20 characters, alphanumeric with underscores
- **Email**: Valid email format
- **Password**:
  - Minimum 6 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
- **Confirm Password**: Must match password

### Login

- **Email**: Valid email format
- **Password**: Minimum 6 characters

## 🚀 Deployment

### Building for Production

**Android APK**

```bash
npx expo build:android
```

**iOS IPA**

```bash
npx expo build:ios
```

**Using EAS Build** (Recommended)

```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## 🤝 Contributing

This project follows best practices:

- Feature-based Git commits
- Clean, documented code
- Reusable components
- Proper error handling
- Consistent naming conventions

## 📄 License

This project is created for educational purposes.

## 🙏 Acknowledgments

- TMDB for providing the movie database API
- React Native community for excellent documentation
- Expo team for the amazing development platform

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review the code documentation
3. Check React Native and Expo documentation

## 🔄 Version History

- **v1.0.0** (Current)
  - Initial release
  - Full authentication system
  - Movie browsing and search
  - Favourites management
  - Dark mode support
  - Profile management

---

**Built with ❤️ using React Native and Expo**
