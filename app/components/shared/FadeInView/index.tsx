import React, { useEffect } from 'react'
import { Animated, useAnimatedValue } from 'react-native'
import type { PropsWithChildren } from 'react'
import type { ViewStyle } from 'react-native'

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>
