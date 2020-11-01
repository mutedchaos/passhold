import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
  children: string
}

const Container = styled.span`
  padding: 5px;
  border: 1px inset black;
  min-width: 300px;
  display: inline-block;
  margin-right: 10px;
`

export default function Masked({children}: Props) {
  const [error, setError] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [notification, setNotification] = useState('')

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children.toString())
      setNotification('copied')
    } catch (err) {
      setError(err.message)
    }
  }, [children])

  useEffect(() => {
    let relevant = true
    const timeout = setTimeout(() => {
      relevant = false
      setNotification(notification.substring(0, 0))
    }, 2000)
    return () => {
      if (relevant) clearTimeout(timeout)
    }
  }, [notification])

  const toggleReveal = useCallback(() => {
    window.getSelection()?.removeAllRanges()
    setRevealed((x) => !x)
  }, [])

  const containerRef = React.createRef<HTMLDivElement>()

  useEffect(() => {
    if (containerRef.current && revealed) {
      window.getSelection()?.selectAllChildren?.(containerRef.current)
    }
  }, [containerRef, revealed])

  return (
    <div>
      <div>
        <Container ref={containerRef}>{notification || (revealed ? children : 'xxxxxxxx')}</Container>
        <button onClick={toggleReveal}>reveal</button>
        <button onClick={copy}>copy</button>
      </div>
      {error}
    </div>
  )
}
