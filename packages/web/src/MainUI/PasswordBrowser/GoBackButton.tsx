import React from 'react'

interface Props {
  onClick(): void
}

export default function GoBackButton({onClick}: Props) {
  return <button onClick={onClick}>Back</button>
}
