import getPageContext from 'UTILS/getPageContext'
import { create } from 'jss'
import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, jssPreset } from '@material-ui/core/styles'

const jss = create({
  ...jssPreset(),
  insertionPoint: process.browser
    ? document.getElementById('jss-insertion-point-app')
    : null
})

export const pageContext = getPageContext()

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
      <JssProvider
        registry={pageContext.sheetsRegistry}
        generateClassName={pageContext.generateClassName}
        jss={jss}
      >
        <MuiThemeProvider
          theme={pageContext.theme}
          sheetsManager={pageContext.sheetsManager}
        >
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </JssProvider>
    )
  }
}

export default MuiProvider
