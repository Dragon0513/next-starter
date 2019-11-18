import { breakpointsDown } from 'UTILS/theme'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    ${breakpointsDown('sm')} {
      font-size: 14px;
    }
  }

  body {
    background: #fafcfe;
    overflow-x: hidden;
    font-family: "PingFangSC-Light", "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }

  #__next {
    display: flex;
    flex-direction: column;
  }
`

export default GlobalStyle
