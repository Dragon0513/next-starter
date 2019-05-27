import _ from 'lodash'
import { css } from 'styled-components'

import { createMuiTheme } from '@material-ui/core/styles'

const myTypographyFontFamily = {
  100: `"PingFangSC-Ultralight", "Helvetica Neue", Helvetica, Arial,  "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;`,
  200: `"PingFangSC-Thin", "Helvetica Neue", Helvetica, Arial,  "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;`,
  300: `"PingFangSC-Light", "Helvetica Neue", Helvetica, Arial,  "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;`,
  400: `"PingFangSC", "Helvetica Neue", Helvetica, Arial,  "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;`,
  500: `"PingFangSC-Medium", "Helvetica Neue", Helvetica, Arial,  "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;`,
  900: `"PingFangSC-Semibold", "Helvetica Neue", Helvetica, Arial,  "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;`
}

const defaultTheme = {
  palette: {
    type: 'light',
    primary: {
      main: '#58C1B6',
      light: '#79D8CE',
      contrastText: '#fff'
    },
    secondary: {
      main: '#5a8dbe',
      light: '#5cb1b7',
      contrastText: '#fff'
    },
    text: {
      primary: '#272E3E',
      secondary: '#545A69',
      disabled: '#797F8F'
    },
    error: {
      main: '#D94F43'
    },
    warning: {
      main: '#FFBD2A'
    },
    tonalOffset: 0.05,
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.1)',
      hoverOpacity: 0.05,
      selected: 'rgba(0, 0, 0, 0.14)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)'
    },
    border: {
      main: 'rgba(232, 236, 243, 1)'
    }
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 56
      },
      '@media (min-width:600px)': {
        minHeight: 56
      }
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: `"PingFangSC", "Helvetica Neue", Helvetica, Arial,  "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;`,
    h1: {
      fontSize: '2.375rem', // 38px
      lineHeight: 1.3 // 37.33333px
    },
    h2: {
      fontSize: '2.25rem', // 36px
      lineHeight: 1.3 // 34.66667px
    },
    h3: {
      fontSize: '1.5rem', // 24px
      lineHeight: 1 // 32px
    },
    h4: {
      fontSize: '1.375rem', // 22px
      lineHeight: 18 / 11 // 29.3333333px
    },
    h5: {
      fontSize: '1.25rem', // 20px
      lineHeight: 1 // 26.666667px
    },
    h6: {
      fontSize: '1.125rem', // 18px
      lineHeight: 1.3 // 24px
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 12 / 7
    },
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 12 / 7 // 20px
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      fontFamily: myTypographyFontFamily[500],
      lineHeight: '1'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920
    }
  }
}

export const getTheme = (newTheme = {}) =>
  createMuiTheme(_.merge(defaultTheme, newTheme))

// https://material-ui.com/customization/default-theme/
const theme = getTheme()

export const scrollbar = css`
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 2px;
    transition: all 0.3s;
    background: rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    transition: all 0.3s;
    background: rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0);
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.12);
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.12);
    }
  }
`

export const getMyTypographyFontFamily = fontWeight => {
  const keys = Object.keys(myTypographyFontFamily)
  for (const key of keys) {
    const parsedKey = parseInt(key, 10)
    const parsedFontWeight = parseInt(fontWeight, 10)
    if (parsedFontWeight <= parsedKey) {
      return myTypographyFontFamily[key]
    }
  }
  return myTypographyFontFamily['400']
}

export const palettePrimaryMain = () => theme.palette.primary.main
export const palettePrimaryLight = () => theme.palette.primary.light
export const palettePrimaryDark = () => theme.palette.primary.dark

export const paletteSecondaryMain = () => theme.palette.secondary.main
export const paletteSecondaryLight = () => theme.palette.secondary.light

export const paletteBackgroundDefault = () => theme.palette.background.default
export const paletteTextPrimary = () => theme.palette.text.primary
export const paletteTextSecondary = () => theme.palette.text.secondary
export const paletteTextDisabled = () => theme.palette.text.disabled
export const paletteErrorMain = () => theme.palette.error.main
export const paletteWarningMain = () => theme.palette.warning.main
export const paletteErrorLight = () => theme.palette.error.light

export const paletteActionBackgroundColor = () =>
  theme.palette.action.disabledBackground
export const paletteBorderColor = () => theme.palette.border.main

export const breakpointsDown = theme.breakpoints.down
export const breakpointsValues = theme.breakpoints.values

export const transitionsCreate = (...args) => () =>
  theme.transitions.create(...args)

export const spacingUnit = theme.spacing
export const typographyFontSize = () => theme.typography.fontSize
export const typographyH6FontSize = () => theme.typography.h6.fontSize
export const typographyH6LineHeight = () => theme.typography.h6.lineHeight
export const typographyButtonFontSize = () => theme.typography.button.fontSize
export const typographyBody2LineHeight = () => theme.typography.body2.lineHeight
export const typographyButtonLineHeight = () =>
  theme.typography.button.lineHeight
export const shapeBorderRadius = () => theme.shape.borderRadius

// styled-components 工具
export const not = (...keys) => value => props => {
  for (const key of keys) {
    if (props[key]) {
      return ''
    }
  }
  return typeof value === 'function' ? value(props) : value
}

export const check = (...keys) => value => props => {
  for (const key of keys) {
    if (props[key]) {
      return typeof value === 'function' ? value(props) : value
    }
  }
  return ''
}

export const checkBy = (property, mapping) => props => {
  const value = mapping[props[property]]
  return typeof value === 'function' ? value(props) : value
}

export default theme
