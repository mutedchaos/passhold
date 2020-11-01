import React, {ReactNode, useCallback, useContext, useEffect, useMemo, useState} from 'react'

type Callback = () => void

interface Ctx {
  goBack: null | Callback
  push(callback: Callback): void
  remove(callback: Callback): void
}

export const goBackContext = React.createContext<Ctx>(null as any)

export function GoBackContextProvider({children}: {children: ReactNode}) {
  const [callbacks, setCallbacks] = useState<Callback[]>([])

  const topmost = callbacks[callbacks.length - 1] ?? null

  const push = useCallback<Ctx['push']>((callback) => {
    setCallbacks((old) => [...old, callback])
  }, [])

  const remove = useCallback<Ctx['remove']>((callback) => {
    setCallbacks((old) => old.filter((x) => x !== callback))
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      goBack: topmost,
      push,
      remove,
    }),
    [push, remove, topmost]
  )
  return <goBackContext.Provider value={value}>{children}</goBackContext.Provider>
}

export function useBackButton(callback: Callback | null) {
  const {push, remove} = useContext(goBackContext)
  useEffect(() => {
    if (callback) {
      push(callback)
      return () => remove(callback)
    }
  }, [callback, push, remove])
}
