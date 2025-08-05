import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../hooks/useUser';
import { useRouter } from 'expo-router';
import LogoutIconButton from '../components/LogoutIconButton '


const Welcome = ({ username }) => {


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <LogoutIconButton />
        <Text style={styles.welcomeText}>
          Welcome back, {username}.
        </Text>
        
        <Text style={styles.description}>
          I’m here to help you deepen your connection and nurture your intimacy.
        </Text>
         

        <View style={styles.card}>
          <Text style={styles.promptLabel}>Today’s Intimacy Prompt</Text>
          <Text style={styles.prompt}>
            What’s something small your partner did recently that made you feel loved?
          </Text>
        </View>

        <TouchableOpacity style={styles.button} 
            onPress={() => {
                router.replace('/bondwell')
            }}
        >
          <Text style={styles.buttonText}>Get Advice from our Lisa Bondwell</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace('/quiz')}
          style={[styles.button, styles.secondaryButton]}
        >
          <Text style={styles.secondaryButtonText}>Find Your Love Language</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default function Home() {
    const {user,isLoggedIn,isLoading} = useUser()

      const router = useRouter();
      useEffect(() => {
        if(!isLoggedIn && !isLoading){
            router.replace('login')
        }
      },[isLoggedIn,isLoading])
  return isLoggedIn &&  <Welcome username={user.email} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#F2C6C2', // soft pink
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#DDD',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    width: '100%',
  },
  promptLabel: {
    color: '#F2C6C2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  prompt: {
    color: '#EAEAEA',
    fontSize: 16,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#F2C6C2',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 16,
    width: '100%',
  },
  buttonText: {
    color: '#1C1C1E',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F2C6C2',
  },
  secondaryButtonText: {
    color: '#F2C6C2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
