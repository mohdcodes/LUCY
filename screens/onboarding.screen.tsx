import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  ViewBase,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { onBoardingData } from '@/configs/constants';
import { scale, verticalScale } from 'react-native-size-matters';
import index from '@/app';

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
    // Linear Gradient Background.
    <LinearGradient
      colors={['#150252', '#00fff0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* STATUS BAR HIDDEN */}
      <StatusBar barStyle={'light-content'} hidden />
      {/* Skip on the Top Right */}
      <View style={styles.skiContainer}>
        <Text style={styles.skipText}>skip</Text>
        <AntDesign name="arrowright" size={scale(18)} color="white" />
      </View>
      {/* Horizontal Scroll View */}
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
            <Text style={styles.subtitle}>{item.subtitle} </Text>
          </View>
        ))}
      </ScrollView>
      {/* Pagination */}
      <View style={styles.paginationContainer}>
        {onBoardingData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: activeIndex === index ? 1 : 0.3 }]}
          />
        ))}
      </View>
    </LinearGradient>
  );
}
// StyleSheet
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
    marginTop: 15,
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#000000',
    fontSize: scale(16),
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 5,
  },
  paginationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: verticalScale(50),
    alignItems: 'center',
    gap: scale(8),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: 100,
    backgroundColor: '#ffffff',
    marginHorizontal: scale(2),
  },
  skiContainer: {
    marginTop: 20,
    position: 'absolute',
    top: verticalScale(20),
    right: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },
  skipText: {
    color: '#ffffff',
    fontSize: scale(14),
    fontWeight: '400',
  },
  arrowDesign: {
    marginLeft: 10,
  },
});
