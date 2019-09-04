import React from 'react'
// @ts-ignore
import sprite from 'svg-sprite-loader/runtime/sprite.build'

// @ts-ignore
const requireAll = requireContext => requireContext.keys().map(requireContext)
// @ts-ignore
const req = require.context('RESOURCE/icon', true, /\.svg$/)
requireAll(req)

const spriteContent = sprite.stringify()

const SvgSprite = () => {
  return <div dangerouslySetInnerHTML={{ __html: spriteContent }} />
}

export default SvgSprite
