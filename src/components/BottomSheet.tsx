import { Animated, Dimensions, Modal, PanResponder, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

interface BottomSheetProps {
  visible: boolean;
  children: React.ReactNode;
  onDismiss: () => void;
}

const BottomSheet = ({ visible, children, onDismiss }: BottomSheetProps) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const resetPositionAnim = useRef<Animated.CompositeAnimation | null>(null);
  const closeAnim = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    resetPositionAnim.current = Animated.timing(panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });

    closeAnim.current = Animated.timing(panY, {
      toValue: screenHeight,
      duration: 500,
      useNativeDriver: true,
    });
  }, [panY, screenHeight]);

  useEffect(() => {
    if (visible) {
      resetPositionAnim.current?.start();
    }
  }, [visible]);

  const handleDismiss = () => {
    closeAnim.current?.start(() => onDismiss());
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dy: panY }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gs) => {
        if (gs.dy > 0 && gs.vy > 2) {
          return closeAnim.current?.start(() => onDismiss());
        }
        return resetPositionAnim.current?.start();
      },
    })
  ).current;

  const translateY = panY.interpolate({
    inputRange: [-1, 0, screenHeight],
    outputRange: [0, 0, screenHeight],
    extrapolate: 'clamp',
  });

  return (
    <Modal
      animationType='fade'
      visible={visible}
      transparent
      onRequestClose={handleDismiss}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.container, { transform: [{ translateY }] }]}
          {...panResponder.panHandlers}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}
export default BottomSheet

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex:  1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  }
})