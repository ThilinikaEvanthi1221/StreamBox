import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { MovieCard } from '../components';
import { COLORS } from '../constants';

const FavouritesScreen = ({ navigation }) => {
  const { items: favourites } = useSelector((state) => state.favourites);
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = isDark ? COLORS.dark : COLORS.light;

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetails', { movieId: movie.id });
  };

  const handleFavouritePress = (movie) => {
    // The MovieCard component will handle the toggle
    // Redux action will be dispatched from there
  };

  const isFavourite = (movieId) => {
    return favourites.some((fav) => fav.id === movieId);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={64} color={colors.textSecondary} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No Favourites Yet
      </Text>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        Start adding movies to your favourites by tapping the heart icon
      </Text>
      <TouchableOpacity
        style={[styles.browseButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Feather name="film" size={20} color="#FFFFFF" />
        <Text style={styles.browseButtonText}>Browse Movies</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={favourites}
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
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default FavouritesScreen;
