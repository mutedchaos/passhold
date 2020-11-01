import React, {useContext} from 'react'
import {goBackContext} from './goBackContext'

interface Props {
  className?: string
}

const hidden = {visibility: 'hidden' as const}

export default function GenericBackButton({className}: Props) {
  const {goBack} = useContext(goBackContext)
  if (!goBack)
    return (
      <button className={className} style={hidden}>
        &lt;&lt;
      </button>
    )
  return (
    <button className={className} onClick={goBack}>
      &lt;&lt;
    </button>
  )
}
