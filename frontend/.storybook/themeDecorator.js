import React from 'react'
import ThemeProvider from '~/shared/components/ThemeProvider'

const ThemeDecorator = storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>

export default ThemeDecorator
