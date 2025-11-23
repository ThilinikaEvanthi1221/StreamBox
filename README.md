# StreamBox - Movie Browsing App

A React Native mobile application for browsing movies, managing favourites, and exploring movie details.

## Features

- **User Authentication** - Register and login with your own credentials
- **Browse Movies** - View trending and popular movies
- **Movie Details** - See comprehensive information about each movie
- **Favourites** - Save and manage your favourite movies
- **Dark Mode** - Toggle between light and dark themes
- **User Profile** - View profile and manage settings

## Technologies

- React Native with Expo
- Redux Toolkit for state management
- React Navigation
- TMDB API for movie data
- AsyncStorage for local data persistence

## Installation

1. Clone the repository

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Get your TMDB API key from [The Movie Database](https://www.themoviedb.org/settings/api)
   - Add your keys to the `.env` file:
     ```
     TMDB_API_KEY=your_api_key_here
     TMDB_ACCESS_TOKEN=your_access_token_here
     ```

4. Start the app:
   ```bash
   npx expo start -c
   ```
   Note: Use `-c` flag to clear cache and load environment variables

## Usage

### Authentication

Register a new account with:

- Username: minimum 3 characters
- Email: valid email format
- Password: minimum 6 characters (must include uppercase, lowercase, number, and symbol)

Then login with your registered credentials.

### Browse Movies

- View trending and popular movies on the home screen
- Search for specific movies using the search bar
- Tap on any movie to see detailed information
- Add movies to your favourites by tapping the heart icon
