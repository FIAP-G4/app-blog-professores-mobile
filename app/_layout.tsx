import { AuthProvider } from '@/context/AuthContext'
import { Slot } from 'expo-router'
import Toast from 'react-native-toast-message';
import { StyleSheet, View } from 'react-native';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
      <View style={styles.toastContainer}>
        <Toast />
      </View>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  toastContainer: {
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    left: 0,
    right: 0,
  },
});