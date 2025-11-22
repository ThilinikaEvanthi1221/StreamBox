import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { LoadingSpinner, ErrorMessage, Button } from '../components';
import {
  fetchMoviesStart,
  fetchMovieDetailsSuccess,
  fetchMoviesFailure,
  toggleFavourite,
} from '../redux';
import { fetchMovieDetails, getImageUrl } from '../services';
import { storeFavourites } from '../utils';
import { COLORS, IMAGE_SIZES } from '../constants';

const { width } = Dimensions.get('window');

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [localLoading, setLocalLoading] = useState(true);

  const dispatch = useDispatch();
  const { movieDetails, loading, error } = useSelector((state) => state.movies);
  const { items: favourites } = useSelector((state) => state.favourites);
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = isDark ? COLORS.dark : COLORS.light;

  const isFavourite = favourites.some((fav) => fav.id === movieId);

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  const loadMovieDetails = async () => {
    dispatch(fetchMoviesStart());
    setLocalLoading(true);

    try {
      const data = await fetchMovieDetails(movieId);
      dispatch(fetchMovieDetailsSuccess(data));
    } catch (err) {
      dispatch(fetchMoviesFailure(err.message));
    } finally {
      setLocalLoading(false);
    }
  };

  const handleFavouritePress = async () => {
    if (!movieDetails) return;

    const movieData = {
      id: movieDetails.id,
      title: movieDetails.title,
      poster_path: movieDetails.poster_path,
      vote_average: movieDetails.vote_average,
      release_date: movieDetails.release_date,
      overview: movieDetails.overview,
    };

    dispatch(toggleFavourite(movieData));

    // Persist to storage
    let updatedFavourites;
    if (isFavourite) {
      updatedFavourites = favourites.filter((fav) => fav.id !== movieId);
    } else {
      updatedFavourites = [...favourites, movieData];
    }

    await storeFavourites(updatedFavourites);
  };

  if (localLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LoadingSpinner />
      </View>
    );
  }

  if (error || !movieDetails) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ErrorMessage message={error || 'Failed to load movie details'} onRetry={loadMovieDetails} />
      </View>
    );
  }

  const backdropUrl = getImageUrl(movieDetails.backdrop_path, IMAGE_SIZES.BACKDROP);
  const posterUrl = getImageUrl(movieDetails.poster_path);
  const rating = movieDetails.vote_average?.toFixed(1) || 'N/A';
  const releaseYear = movieDetails.release_date
    ? new Date(movieDetails.release_date).getFullYear()
    : 'N/A';
  const runtime = movieDetails.runtime
    ? `${Math.floor(movieDetails.runtime / 60)}h ${movieDetails.runtime % 60}m`
    : 'N/A';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Backdrop Image */}
      {backdropUrl && (
        <View style={styles.backdropContainer}>
          <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
          <View style={styles.backdropOverlay} />
        </View>
      )}

      {/* Movie Info */}
      <View style={styles.content}>
        <View style={styles.posterRow}>
          {posterUrl && (
            <Image source={{ uri: posterUrl }} style={styles.poster} />
          )}

          <View style={styles.basicInfo}>
            <Text style={[styles.title, { color: colors.text }]}>
              {movieDetails.title}
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Feather name="star" size={16} color="#FFD700" />
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  {rating}
                </Text>
              </View>

              <View style={styles.metaItem}>
                <Feather name="calendar" size={16} color={colors.textSecondary} />
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  {releaseYear}
                </Text>
              </View>

              <View style={styles.metaItem}>
                <Feather name="clock" size={16} color={colors.textSecondary} />
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  {runtime}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.favouriteButton, { backgroundColor: colors.primary }]}
              onPress={handleFavouritePress}
            >
              <Feather
                name="heart"
                size={20}
                color="#FFFFFF"
                fill={isFavourite ? '#FFFFFF' : 'transparent'}
              />
              <Text style={styles.favouriteButtonText}>
                {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Genres */}
        {movieDetails.genres && movieDetails.genres.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Genres</Text>
            <View style={styles.genresContainer}>
              {movieDetails.genres.map((genre) => (
                <View
                  key={genre.id}
                  style={[styles.genreTag, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <Text style={[styles.genreText, { color: colors.text }]}>
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Overview */}
        {movieDetails.overview && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
            <Text style={[styles.overview, { color: colors.textSecondary }]}>
              {movieDetails.overview}
            </Text>
          </View>
        )}

        {/* Cast */}
        {movieDetails.credits?.cast && movieDetails.credits.cast.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {movieDetails.credits.cast.slice(0, 10).map((person) => {
                const profileUrl = getImageUrl(person.profile_path, IMAGE_SIZES.PROFILE);
                return (
                  <View key={person.id} style={styles.castItem}>
                    {profileUrl ? (
                      <Image source={{ uri: profileUrl }} style={styles.castImage} />
                    ) : (
                      <View style={[styles.castImagePlaceholder, { backgroundColor: colors.card }]}>
                        <Feather name="user" size={32} color={colors.textSecondary} />
                      </View>
                    )}
                    <Text style={[styles.castName, { color: colors.text }]} numberOfLines={2}>
                      {person.name}
                    </Text>
                    <Text style={[styles.castCharacter, { color: colors.textSecondary }]} numberOfLines={1}>
                      {person.character}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Additional Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Additional Information</Text>
          
          {movieDetails.status && (
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Status:</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{movieDetails.status}</Text>
            </View>
          )}

          {movieDetails.budget > 0 && (
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Budget:</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                ${movieDetails.budget.toLocaleString()}
              </Text>
            </View>
          )}

          {movieDetails.revenue > 0 && (
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Revenue:</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                ${movieDetails.revenue.toLocaleString()}
              </Text>
            </View>
          )}

          {movieDetails.original_language && (
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Language:</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {movieDetails.original_language.toUpperCase()}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdropContainer: {
    width: width,
    height: width * 0.56, // 16:9 aspect ratio
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    padding: 16,
  },
  posterRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 16,
  },
  basicInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    marginLeft: 4,
  },
  favouriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  favouriteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  genreText: {
    fontSize: 14,
  },
  overview: {
    fontSize: 15,
    lineHeight: 22,
  },
  castItem: {
    width: 100,
    marginRight: 12,
  },
  castImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  castImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  castName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  castCharacter: {
    fontSize: 12,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    width: 100,
  },
  infoValue: {
    fontSize: 14,
    flex: 1,
  },
});

export default MovieDetailsScreen;
