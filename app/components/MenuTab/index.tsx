import React, { FC, useEffect, useRef } from 'react'
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'

const MenuTab: FC<any> = (props) => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected
  const viewRef = useRef<Animatable.View & View>(null)

  useEffect(() => {
    if (focused) {
      if (viewRef.current) {
        (viewRef.current as any).animate({0: {scale: 1}, 1: {scale: 1.5}}, 130)
      }
    }else{
      (viewRef.current as any).animate({0: {scale: 1.5}, 1: {scale: 1}}, 130) 
    }
  }, [focused])

  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={1}
      style={styleButton.container}>
        <Animatable.View 
          ref={viewRef}
          animation="zoomIn"
          duration={2000}
          style={styleButton.container}>
          <item.byIcon size={30} name={item.activeIcon as keyof typeof item.byIconr.glyphMap} color={focused ? '#007bff' : '#80bdff'} />
        </Animatable.View>
    </TouchableOpacity>
  )
}
const styleButton = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

export default MenuTab