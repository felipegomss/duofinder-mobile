import { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '../../components/Background';
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'

import { GameParams } from '../../@types/navigation';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {
  const [ads, setAds] = useState<DuoCardProps[]>([])


  const route = useRoute()
  const game = route.params as GameParams

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    fetch(`http://192.168.15.6:3333/games/${game.id}/ads`)
      .then(res => res.json())
      .then(data => {
        setAds(data)
      })
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.banner}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => { }} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={ads.length > 0 ? styles.contentList : ads.length === 0 && styles.emptyContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() =>
            <Text style={styles.empty}>Ainda não há anúncios para este jogo.</Text>
          }
        />
      </SafeAreaView>
    </Background>
  );
}