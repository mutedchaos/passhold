import React, {ReactNode, useCallback, useContext, useMemo, useState} from 'react'
import styled from 'styled-components'
import MainLayout from './UIComponents/MainLayout'

interface OverlayCtx {
  push(overlay: ReactNode): {done: Promise<void>; pop: () => void}
  pop(): void
}

interface Props {
  children: ReactNode
}

const OverlayContainer = styled.div``

const ChildContainer = styled.div<{visible: boolean}>`
  display: ${({visible}) => (visible ? 'block' : 'none')};
`

export const overlayContext = React.createContext<OverlayCtx>(null as any)

interface OverlayStackEntry {
  node: ReactNode
  onClose(): void
  id: string
}

let lastId = 0

export default function OverlayProvider({children}: Props) {
  const [overlays, setOverlays] = useState<OverlayStackEntry[]>([])
  const activeOverlay = overlays[overlays.length - 1]

  const push = useCallback((overlay: ReactNode) => {
    const id = (++lastId).toString()
    const done = new Promise<void>((resolve) => {
      setOverlays((old) => [...old, {id, node: overlay, onClose: resolve}])
    })
    return {
      done,
      pop() {
        setOverlays((old) => old.filter((x) => x.id !== id))
      },
    }
  }, [])

  const pop = useCallback(() => {
    setOverlays((old) => old.slice(0, -1))
  }, [])

  const value = useMemo<OverlayCtx>(() => ({push, pop}), [push, pop])

  return (
    <overlayContext.Provider value={value}>
      {activeOverlay && (
        <MainLayout>
          <OverlayContainer>{activeOverlay?.node}</OverlayContainer>
        </MainLayout>
      )}

      <ChildContainer visible={!activeOverlay}>{children}</ChildContainer>
    </overlayContext.Provider>
  )
}

export function useOverlay() {
  return useContext(overlayContext)
}
