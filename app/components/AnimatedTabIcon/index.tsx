import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons'

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
    <Animatable.View ref={viewRef} animation="zoomIn" duration={2000} style={{ justifyContent: 'center', alignItems: 'center' }}>
      <IconComponent name={name} size={25} color={focused ? '#007bff' : '#80bdff'} />
    </Animatable.View>
  )
}

export default AnimatedTabIcon
