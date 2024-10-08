import OnBoardingImage from '@/assets/svgs/onboarding1';
import { Image, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  manage1: {
    width: scale(270),
    height: scale(310),
  },
  manage2: {
    marginTop: 42,
    width: scale(270),
    height: scale(290),
  },
  manage3: {
    marginTop: 20,
    width: scale(280),
    height: scale(290),
  },
});

export const onBoardingData: onBoardingDataType[] = [
  {
    id: 1,
    title: 'YOUR SPEAK, WE ANSWERS',
    subtitle: 'Speak, and get solutions in text and audio.',
    image: (
      <Image
        style={styles.manage1}
        source={require('../assets/images/sunset.png')}
      />
    ),
  },
  {
    id: 2,
    title: 'SIMPLIFY YOUR DAY',
    subtitle: 'Stay hands-free while your assistant handles the rest',
    image: (
      <Image
        style={styles.manage2}
        source={require('../assets/images/nature.png')}
      />
    ),
  },
  {
    id: 3,
    title: 'SPEAK YOUR MIND',
    subtitle: 'Effortlessly ask anything with just your voice',
    image: (
      <Image
        style={styles.manage3}
        source={require('../assets/images/tea.png')}
      />
    ),
  },
];
