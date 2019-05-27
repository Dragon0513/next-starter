import IcoIcon from 'COMPONENTS/base/IcoIcon'
import { palettePrimaryMain } from 'UTILS/theme'
import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet as StyledServerStyleSheet } from 'styled-components'
import flush from 'styled-jsx/server'
import { ServerStyleSheets as MuiServerStyleSheet } from '@material-ui/styles'
import sprite from 'svg-sprite-loader/runtime/sprite.build'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('RESOURCE/icon', true, /\.svg$/)
requireAll(req)

const spriteContent = sprite.stringify()

class MyDocument extends Document {
  render () {
    return (
      <html lang='zh-CN' dir='ltr'>
        <Head>
          <meta charSet='utf-8' />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1,maximum-scale=1, width=device-width, shrink-to-fit=no'
          />
          <IcoIcon href='' />
          {/* Cache */}
          <meta httpEquiv='pragma' content='no-cache' />
          <meta httpEquiv='Cache-Control' content='no-cache' />
          <meta httpEquiv='expires' content='0' />
          <meta name='theme-color' content={palettePrimaryMain()} />
        </Head>
        <body>
          <div dangerouslySetInnerHTML={{ __html: spriteContent }} />
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }

  static async getInitialProps (ctx) {
    const styledSheet = new StyledServerStyleSheet()
    const sheets = new MuiServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheets.collect(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: (
          <React.Fragment>
            {sheets.getStyleElement()}
            {flush() || null}
            {styledSheet.getStyleElement()}
          </React.Fragment>
        )
      }
      /* eslint-enable */
    } catch (err) {
      console.error(err)
    } finally {
      styledSheet.seal()
    }
  }
}

export default MyDocument
