// import GlobalStyle from 'COMPONENTS/expand/GlobalStyle'
import MuiProvider, { pageContext } from 'COMPONENTS/expand/MuiProvider'
import configureStore from 'REDUX/store'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

const store = configureStore()

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title>next-starter</title>
        </Head>

        <MuiProvider>
          {/* <Normalize /> */}
          {/* <GlobalStyle /> */}
          <ThemeProvider theme={pageContext.theme}>
            <Provider store={store}>
              <Fragment>
                <Component pageContext={pageContext} {...pageProps} />
              </Fragment>
            </Provider>
          </ThemeProvider>
        </MuiProvider>
      </Container>
    )
  }
}

export default MyApp
