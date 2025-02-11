import { AuthProvider } from '@/context/AuthContext'
import Toast from 'react-native-toast-message'
import { Slot } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthProvider>
          <Slot />
          <View style={styles.toastContainer}>
            <Toast />
          </View>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
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
})
