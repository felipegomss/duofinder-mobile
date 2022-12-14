import { ImageBackground, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps
}

export function GameCard({ data, ...res }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...res}>
      <ImageBackground
        style={styles.cover}
        source={{ uri: data.bannerUrl }}
      >

        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.title}
          </Text>
          <Text style={styles.ads}>
            {data._count.ads} anúncio(s)
          </Text>
        </LinearGradient>
      </ImageBackground >
    </TouchableOpacity>
  );
}