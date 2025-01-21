import React from 'react'
import { Tabs } from 'expo-router'
import Header from '../../components/shared/Header'

export default function TabLayout() {
  return (
    <>
      <Header pageTitle="Dashboard" />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="/dashboard/super-admin"
          options={{
            title: 'Admin',
          }}
        />
        <Tabs.Screen
          name="/dashboard/teacher"
          options={{
            title: 'Professor',
          }}
        />
        <Tabs.Screen
          name="/dashboard/student"
          options={{
            title: 'Professor',
          }}
        />
      </Tabs>
    </>
  )
}
