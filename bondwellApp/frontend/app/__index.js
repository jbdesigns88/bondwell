import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import io from 'socket.io-client';
import Login from './login';
import Layout from './_layout';

export default function App() {
 
  //login

  if (!enterRoom) {
    return (
      <Layout/>
      
      // <Login callback={(success, uname) => {
      //   setEnterRoom(success);
      //   setUsername(uname);
      // }}/>
    );
  }
  //end login
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.introText}>Hello {username}, I am Lisa Bondwell, your intimacy guide. new response {isNewResponse ? "true" : "false"}</Text>

      <ScrollView style={styles.messagesContainer}>

 
              <View key={Math.random() **9 } style={container}>
              <Text style={messageStyle}>
                Welcopme to Bondwell
              </Text>
            </View>
      </ScrollView>

 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1C1C1E',
  },
  introText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#E3B9BC',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
    padding: 20,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    color: '#FFDAB9',
    fontSize: 18,
    lineHeight: 30,
  },
  aiMessage: {
    color: '#E6E6FA',
    fontSize: 18,
    lineHeight: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#2D2D2D',
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 10,
    color: '#E3B9BC',
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFDAB9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  typingText: {
    fontSize: 18,
    color: '#FFDAB9',
  },
});



// OLD INDEX PAGE WENT STRAIGHT TO SETTING UP CHAT
/**
 * 
 * 
 * 
 */