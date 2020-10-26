import React, {useCallback, useMemo, useState} from 'react'
import debounce from 'lodash/debounce'

interface Props {
  onFilter(filter: string): void
}

export default function PasswordFilter({onFilter}: Props) {
  const [filter, setFilter] = useState('')
  const debouncedOnFilter = useMemo(() => debounce(onFilter, 100), [onFilter])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFilter = e.target.value
      setFilter(newFilter)
      debouncedOnFilter(newFilter)
    },
    [debouncedOnFilter]
  )

  return <input value={filter} onChange={handleChange} placeholder="Filter" />
}
