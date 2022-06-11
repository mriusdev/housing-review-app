import { extendTheme } from "@chakra-ui/react"

const colors = {
  brand: {
    mainDark: '#2D2727',
    blue: '#5B8FF3',
    orange: '#F3BF5B',
  }
}

const fonts = {
  body: 'Inter, sans-serif'
}

const theme = extendTheme({ colors, fonts })

export default theme