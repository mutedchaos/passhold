import React from 'react'
import Masked from './Masked'
import {MaybeMaskedValue} from './MaybeMaskedValue'

interface Props {
  children: any
}

export default function MaybeMasked({children}: Props) {
  return (
    <Masked forceUnmasked={!children.getText}>{children.getText ? children.getText() : children.toString()}</Masked>
  )
}
