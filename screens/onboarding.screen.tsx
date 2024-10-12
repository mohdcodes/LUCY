import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { onBoardingData } from '@/configs/constants';
import { scale, verticalScale } from 'react-native-size-matters';

export default function OnBoardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // FUNCTION FOR HANDLING THE SKIP BUTTON PRESS.
  const handleSkip = () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex < onBoardingData.length) {
      scrollViewRef.current?.scrollTo({
        x: Dimensions.get('window').width * nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    } else {
      console.log('last index');
    }
  };

  // FUNCTION FOR HANDLING THE SCROLL EFFECT.
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffSetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(
      contentOffSetX / event.nativeEvent.layoutMeasurement.width
    );
    setActiveIndex(currentIndex);
  };

  return (
    <LinearGradient
      colors={['#150252', '#00fff0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* STATUS BAR HIDDEN */}
      <StatusBar hidden />

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipContainer} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
        <AntDesign name="arrowright" size={scale(18)} color="white" />
      </TouchableOpacity>

      {/* Horizontal Scroll View */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {onBoardingData.map((item, index) => (
          <View key={index} style={styles.slide}>
            {item.image}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
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
  skipContainer: {
    position: 'absolute',
    top: verticalScale(40),
    right: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
    zIndex: 1, // Ensures the skip button is clickable
  },
  skipText: {
    color: '#ffffff',
    fontSize: scale(16),
    fontWeight: '400',
  },
});
