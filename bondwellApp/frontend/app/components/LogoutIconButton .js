import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useUser } from '../hooks/useUser';
import { useRouter } from 'expo-router';

const LogoutIconButton  = () => {
  const { Logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await Logout();
    router.replace('/login')
    
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.button}>
      <Icon name="log-out" size={24} color="#F2C6C2" />
    </TouchableOpacity>
  );
};

export default LogoutIconButton ;

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});
