import React from 'react'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name='/dashboard/super-admin'
          options={{
            title: 'Admin',
          }}
        />
        <Tabs.Screen
          name='/dashboard/teacher'
          options={{
            title: 'Professor',
          }}
        />
        <Tabs.Screen
          name='/dashboard/student'
          options={{
            title: 'Estudante',
          }}
        />
      </Tabs>
    </>
  )
}
