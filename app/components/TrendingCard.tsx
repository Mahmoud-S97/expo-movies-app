import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import { images } from '@/constants/images';

const TrendingCard = ({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) => {
    console.log('Movie-title: ', title);
  return (
    <Link href={`/movies/${movie_id}`} asChild>
        <TouchableOpacity activeOpacity={0.7} className="w-32 relative pl-5">
            <Image source={{ uri: poster_url }} className="w-32 h-48 rounded-lg" resizeMode='cover' />
            <View className="absolute bottom-9 -left-2 px-2 py-1 rounded-full">
                <MaskedView maskElement={
                    <Text className="font-bold text-white text-6xl">{index + 1}</Text>
                }>
                    <Image source={images.rankingGradient} className="size-14" resizeMode='cover' />
                </MaskedView>
            </View>
            <Text className="font-bold text-light-200 text-sm mt-2" numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard;