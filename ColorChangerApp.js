import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ColorChangerApp = () => {
  const [backgroundColor, setBackgroundColor] = useState('white');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Button title="White" onPress={() => setBackgroundColor('white')} />
      <Button title="Light Blue" onPress={() => setBackgroundColor('#7AF3FF')} />
      <Button title="Light Green" onPress={() => setBackgroundColor('#C6F4D6')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default ColorChangerApp;