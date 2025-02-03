import { Slot, usePathname, useSegments } from 'expo-router'
import React from 'react'
import Header from '@/app/components/shared/Header'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function AuthLayout() {
    const Tab = createBottomTabNavigator();
  const pathName = usePathname()
  const segments = useSegments()
  const screenName =
    segments.length > 1
      ? segments.slice(-1)[0].charAt(0).toUpperCase() +
        segments.slice(-1)[0].slice(1)
      : pathName.charAt(1).toUpperCase() + pathName.slice(2)

  return (
    <>
      <Header
        pageTitle={screenName !== 'Login' ? 'Blog Escolar' : screenName}
      />
      <Slot />
    </>
  )
}
