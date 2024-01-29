import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {

  const data = ['#780000', '#c1121f', '#fdf0d5', '#003049', '#6e97b1'];

  const flatlistRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { width, height } = useWindowDimensions()

  useEffect(() => {
    const unsubscribe = setInterval(() => {
      if (!!!data.length) return;
      const newIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(newIndex);
      flatlistRef.current?.scrollToIndex({ animated: true, index: newIndex });
    }, 3000);

    return () => {
      clearTimeout(unsubscribe);
    };
  }, [currentIndex]);

  return <FlatList
    ref={flatlistRef}
    data={data}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onMomentumScrollEnd={(event) => {
      const index = Math.floor(
        event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
      );
      if (currentIndex !== index) {
        setCurrentIndex(index);
      }
    }}
    renderItem={({ item }) => (
      <View style={{ flex: 1, backgroundColor: item, width, height, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 50 }}>{item.toUpperCase()}</Text>
      </View>
    )}
  />

}

export default App