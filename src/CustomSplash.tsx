import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from "expo-image";


function CustomSplash() {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: "https://storage.googleapis.com/artifym/image_2024-06-09_071912442.png"}}
        style={styles.logo}
      />
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default CustomSplash;
