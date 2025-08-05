import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Loading = ({ message = "Getting things ready for you..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#F2C6C2" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#F2C6C2',
    textAlign: 'center',
  },
});
