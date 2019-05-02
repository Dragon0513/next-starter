import Document, { Head, Main, NextScript } from 'next/document'

import IcoIcon from 'COMPONENTS/base/IcoIcon'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import flush from 'styled-jsx/server'
import { palettePrimaryMain } from 'UTILS/theme'
import sprite from 'svg-sprite-loader/runtime/sprite.build'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('RESOURCE/icon', true, /\.svg$/)
requireAll(req)

const spriteContent = sprite.stringify()

export default class MyDocument extends Document {
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

          <noscript id='jss-insertion-point-app' />
          {this.props.styleTags}
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
    const sheet = new ServerStyleSheet()
    let pageContext

    try {
      const page = ctx.renderPage(App => props => {
        pageContext = props.pageContext
        return sheet.collectStyles(<App {...props} />)
      })

      const initialProps = await Document.getInitialProps(ctx)

      let css
      if (pageContext) {
        css = pageContext.sheetsRegistry.toString()
      }

      return {
        ...page,
        pageContext,
        styles: (
          <>
            <style
              id='jss-server-side'
              dangerouslySetInnerHTML={{ __html: css }}
            />
            {flush() || null}
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
}
