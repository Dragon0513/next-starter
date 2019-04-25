import MuiProvider from 'COMPONENTS/expand/MuiProvider'
import configureStore from 'REDUX/store'
import getPageContext from 'UTILS/getPageContext'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

const store = configureStore()

class MyApp extends App {
  pageContext = getPageContext()

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title>next-starter</title>
        </Head>

        <MuiProvider pageContext={this.pageContext}>
          {/* <CssBaseline /> */}
          {/* <Normalize /> */}
          {/* <GlobalStyle /> */}
          <ThemeProvider theme={this.pageContext.theme}>
            <Provider store={store}>
              <Fragment>
                <Component pageContext={this.pageContext} {...pageProps} />
              </Fragment>
            </Provider>
          </ThemeProvider>
        </MuiProvider>
      </Container>
    )
  }
}

export default MyApp
