import React, {useCallback} from 'react'

interface Props {
  value: string
  onCopied?(): void
}

export default function CopyButton({value, onCopied}: Props) {
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(value)
    onCopied?.()
  }, [onCopied, value])

  return <button onClick={handleCopy}>copy</button>
}
