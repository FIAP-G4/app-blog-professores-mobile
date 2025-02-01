import { AuthProvider } from '@/context/AuthContext'
import { Stack } from 'expo-router'
import React from 'react'
import Toast from 'react-native-toast-message'

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </AuthProvider>
    </>
   ) 
}
