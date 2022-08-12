import React, { useState } from 'react'
const SaleCharge = ({text = 'Loading'}) => {
  const [renderText, setRenderText] = useState(text)
  const onClickText = () => {
    setRenderText(() => `${Math.random()}`)
  }
  return (
    <>
      <span onClick={onClickText}>{renderText}</span>
    </>
  )
}

export default SaleCharge
