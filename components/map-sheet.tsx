import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import MapView from 'react-native-maps';

const MapSheet = ({onMapPress}: {onMapPress: (coordinate: {latitude: number, longitude: number}) => void}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Button
        onPress={() => {
          bottomSheetRef.current?.expand();
        }}
        title="Open Map"
      />
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        index={-1}
        snapPoints={['50%', '90%']}
        enablePanDownToClose>
        <BottomSheetView style={styles.contentContainer}>
          <View className="h-full w-full flex-1">
            <MapView
            onPress={(e) => {
              onMapPress(e.nativeEvent.coordinate);}}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MapSheet;
