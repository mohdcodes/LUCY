import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { onBoardingData } from '@/configs/constants';
import { scale } from 'react-native-size-matters';

export default function OnBoardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffSetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(
      contentOffSetX / event.nativeEvent.layoutMeasurement.width
    );
    setActiveIndex(currentIndex);
  };
  return (
    <LinearGradient
      colors={['#150252', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      >
        {onBoardingData.map((item: onBoardingDataType, index: number) => (
          <View key={index} style={styles.slide}>
            {item.image}
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.subtitle} </Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: scale(22),
    textAlign: 'center',
    fontWeight: '500',
  },
});
