import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { MovieCard, LoadingSpinner, ErrorMessage } from '../components';
import {
  fetchMoviesStart,
  fetchTrendingSuccess,
  fetchPopularSuccess,
  fetchMoviesFailure,
  toggleFavourite,
} from '../redux';
import { fetchTrendingMovies, fetchPopularMovies, searchMovies } from '../services';
import { storeFavourites } from '../utils';
import { COLORS } from '../constants';

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('trending'); // trending, popular
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const dispatch = useDispatch();
  const { trendingMovies, popularMovies, loading, error } = useSelector(
    (state) => state.movies
  );
  const { items: favourites } = useSelector((state) => state.favourites);
  const { user } = useSelector((state) => state.auth);
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = isDark ? COLORS.dark : COLORS.light;

  useEffect(() => {
    loadMovies();
  }, [activeTab]);

  const loadMovies = async () => {
    dispatch(fetchMoviesStart());
    try {
      if (activeTab === 'trending') {
        const data = await fetchTrendingMovies();
        dispatch(fetchTrendingSuccess(data));
      } else {
        const data = await fetchPopularMovies();
        dispatch(fetchPopularSuccess(data));
      }
    } catch (err) {
      dispatch(fetchMoviesFailure(err.message));
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadMovies();
    setRefreshing(false);
  }, [activeTab]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    if (query.trim().length < 2) {
      return;
    }

    setSearching(true);
    try {
      const data = await searchMovies(query);
      setSearchResults(data.results);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setSearching(false);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetails', { movieId: movie.id });
  };

  const handleFavouritePress = async (movie) => {
    const movieData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
    };

    dispatch(toggleFavourite(movieData));

    // Persist to storage
    const isFavourite = favourites.some((fav) => fav.id === movie.id);
    let updatedFavourites;

    if (isFavourite) {
      updatedFavourites = favourites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavourites = [...favourites, movieData];
    }

    await storeFavourites(updatedFavourites);
  };

  const isFavourite = (movieId) => {
    return favourites.some((fav) => fav.id === movieId);
  };

  const currentMovies = searchQuery.trim().length > 0
    ? searchResults
    : activeTab === 'trending'
    ? trendingMovies
    : popularMovies;

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Text style={[styles.greeting, { color: colors.textSecondary }]}>
          Welcome back,
        </Text>
        <Text style={[styles.username, { color: colors.text }]}>
          {user?.username || 'User'}
        </Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Feather name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search movies..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Feather name="x" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {!searchQuery && (
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'trending' && [styles.activeTab, { backgroundColor: colors.primary }],
            ]}
            onPress={() => setActiveTab('trending')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'trending' ? '#FFFFFF' : colors.textSecondary },
              ]}
            >
              Trending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'popular' && [styles.activeTab, { backgroundColor: colors.primary }],
            ]}
            onPress={() => setActiveTab('popular')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'popular' ? '#FFFFFF' : colors.textSecondary },
              ]}
            >
              Popular
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (loading && !refreshing && currentMovies.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <LoadingSpinner />
      </View>
    );
  }

  if (error && currentMovies.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <ErrorMessage message={error} onRetry={loadMovies} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={currentMovies}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => handleMoviePress(item)}
            onFavouritePress={() => handleFavouritePress(item)}
            isFavourite={isFavourite(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="film" size={64} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {searchQuery ? 'No movies found' : 'No movies available'}
            </Text>
          </View>
        }
      />
      {searching && (
        <View style={styles.searchingOverlay}>
          <LoadingSpinner size="small" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  userInfo: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 14,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  searchingOverlay: {
    position: 'absolute',
    top: 200,
    alignSelf: 'center',
  },
});

export default HomeScreen;
