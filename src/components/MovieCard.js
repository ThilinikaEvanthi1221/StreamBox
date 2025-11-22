import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';
import { getImageUrl } from '../services';

const MovieCard = ({ movie, onPress, onFavouritePress, isFavourite }) => {
  const isDark = useSelector(state => state.theme.isDark);
  const colors = isDark ? COLORS.dark : COLORS.light;

  const imageUrl = getImageUrl(movie.poster_path);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: colors.border }]}>
            <Feather name="film" size={40} color={colors.textSecondary} />
          </View>
        )}
        <TouchableOpacity
          style={[styles.favouriteButton, { backgroundColor: colors.overlay }]}
          onPress={onFavouritePress}
        >
          <Feather
            name={isFavourite ? 'heart' : 'heart'}
            size={20}
            color={isFavourite ? colors.primary : colors.text}
            fill={isFavourite ? colors.primary : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {movie.title || movie.name}
        </Text>

        <View style={styles.metaContainer}>
          <View style={styles.ratingContainer}>
            <Feather name="star" size={14} color="#FFD700" />
            <Text style={[styles.rating, { color: colors.textSecondary }]}>
              {rating}
            </Text>
          </View>

          {movie.release_date && (
            <Text style={[styles.year, { color: colors.textSecondary }]}>
              {new Date(movie.release_date).getFullYear()}
            </Text>
          )}
        </View>

        {movie.overview && (
          <Text style={[styles.overview, { color: colors.textSecondary }]} numberOfLines={2}>
            {movie.overview}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favouriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '600',
  },
  year: {
    fontSize: 14,
  },
  overview: {
    fontSize: 13,
    lineHeight: 18,
  },
});

export default MovieCard;
