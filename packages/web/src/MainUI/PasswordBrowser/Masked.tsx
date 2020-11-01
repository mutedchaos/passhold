import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useRefreshSession} from '../../SessionManager'
import CopyButton from './CopyButton'
import {MaybeMaskedValue} from './MaybeMaskedValue'

interface Props {
  children: string
  forceUnmasked?: boolean
}

export default function Masked({children, forceUnmasked}: Props) {
  const [error, setError] = useState('')
  const [revealed, setRevealed] = useState(forceUnmasked)
  const [notification, setNotification] = useState('')
  const refreshSession = useRefreshSession()

  const handleCopied = useCallback(() => {
    refreshSession()
    try {
      setNotification('copied')
    } catch (err) {
      setError(err.message)
    }
  }, [refreshSession])

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
    setNotification('')
    window.getSelection()?.removeAllRanges()
    setRevealed((x) => !x)
    refreshSession()
  }, [])

  const containerRef = React.createRef<HTMLDivElement>()

  useEffect(() => {
    if (containerRef.current && revealed) {
      window.getSelection()?.selectAllChildren?.(containerRef.current)
    }
  }, [containerRef, revealed])

  const style = useMemo(() => ({color: notification ? 'green' : 'inherit'}), [notification])

  return (
    <div>
      <div>
        <MaybeMaskedValue style={style} ref={containerRef}>
          {notification || (revealed ? children : 'xxxxxxxx')}
        </MaybeMaskedValue>
        <CopyButton value={children} onCopied={handleCopied} />
        {!forceUnmasked && <button onClick={toggleReveal}>reveal</button>}
      </div>
      {error}
    </div>
  )
}
