import React from 'react'

function IcoIcon (props) {
  const { href } = props

  return (
    <>
      <link rel='icon' href={href} sizes='32x32' />
      <link rel='icon' href={href} sizes='192x192' />
      <link rel='apple-touch-icon-precomposed' href={href} />
      <meta name='msapplication-TileImage' content={href} />
    </>
  )
}

export default IcoIcon
