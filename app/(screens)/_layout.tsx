import { Tabs } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import Toast from 'react-native-toast-message'
import { View } from 'react-native'
import Header from '../components/shared/Header'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { StyleSheet } from 'react-native'


interface AnimatedTabIconProps {
  IconComponent: typeof AntDesign
  name: keyof typeof AntDesign.glyphMap
  focused: boolean
}

const AnimatedTabIcon: React.FC<AnimatedTabIconProps> = ({ IconComponent, name, focused }) => {
  const viewRef = useRef<Animatable.View & View>(null)

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate({ 0: { transform: [{ scale: 1 }] }, 1: { transform: [{ scale: 1.5 }] } }, 130)
    } else {
      viewRef.current?.animate({ 0: { transform: [{ scale: 1.5 }] }, 1: { transform: [{ scale: 1 }] } }, 130)
    }
  }, [focused])

  return (
    <Animatable.View ref={viewRef} animation="zoomIn" style={styles.iconContainer}>
      <IconComponent name={name} size={30} color={focused ? '#007bff' : '#80bdff'} />
    </Animatable.View>
  )
}

export default function AuthLayout() {
  return (
    <>
      <Toast />
      <Header
        pageTitle='Blog Escolar'
      />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tabs.Screen
          name="postagens"
          options={{
            tabBarLabel: '',
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <AnimatedTabIcon IconComponent={AntDesign} name="home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen name="super-admin" options={{ 
          tabBarLabel: '',
          title: 'Super Admin',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon IconComponent={AntDesign} name="home" focused={focused} />
          ),
          }} />
        <Tabs.Screen name="register" options={{ 
          tabBarLabel: '',
          title: 'Cadastrar um usuário',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon IconComponent={AntDesign} name="home" focused={focused} />
          ),
          }} />
        <Tabs.Screen name="student" 
        options={{ 
          tabBarLabel: '',
          title: 'Estudantes',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon IconComponent={AntDesign} name="home" focused={focused} />
          ),
          }} />
        <Tabs.Screen name="teacher" options={{ 
          tabBarLabel: '',
          title: 'Professor',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon IconComponent={AntDesign} name="home" focused={focused} />
          ),
          }} />
      </Tabs>
    </>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})