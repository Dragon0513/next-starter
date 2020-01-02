import React from 'react'
import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document'
import IcoIcon from 'COMPONENTS/base/IcoIcon'
import { palettePrimaryMain } from 'UTILS/theme'
import { ServerStyleSheet as StyledServerStyleSheet } from 'styled-components'
import flush from 'styled-jsx/server'
import { ServerStyleSheets as MuiServerStyleSheet } from '@material-ui/styles'
import SvgSprite from 'COMPONENTS/expand/SvgSprite'

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
          <SvgSprite />
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }

  static async getInitialProps (
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
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
        styles: [
          ...React.Children.toArray(initialProps.styles),
          sheets.getStyleElement(),
          flush() || null,
          ...React.Children.toArray(styledSheet.getStyleElement())
        ]
      }
      /* eslint-enable */
    } catch (err) {
      console.error(err)
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps
      }
    } finally {
      styledSheet.seal()
    }
  }
}

export default MyDocument
