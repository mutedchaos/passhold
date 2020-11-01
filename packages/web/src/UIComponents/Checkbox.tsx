import React, {Children, useCallback} from 'react'
import {ReactNode} from 'react'

interface Props {
  children: ReactNode
  checked: boolean
  onChange(value: boolean): void
}

export default function Checkbox({children, checked, onChange}: Props) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked)
    },
    [onChange]
  )

  return (
    <label>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {children}
    </label>
  )
}
