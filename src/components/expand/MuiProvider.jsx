import React from 'react'

import { ThemeProvider, StylesProvider } from '@material-ui/styles'
import theme from 'UTILS/theme'

class MuiProvider extends React.PureComponent {
  componentDidMount () {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    const { children } = this.props

    return (
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StylesProvider>
    )
  }
}

export default MuiProvider
