import React, {ReactNode, useCallback, useContext, useMemo, useState} from 'react'
import styled from 'styled-components'

interface OverlayCtx {
  push(overlay: ReactNode): void
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

export default function OverlayProvider({children}: Props) {
  const [overlays, setOverlays] = useState<ReactNode[]>([])
  const activeOverlay = overlays[overlays.length - 1]

  const push = useCallback((overlay: ReactNode) => {
    setOverlays((old) => [...old, overlay])
  }, [])

  const pop = useCallback(() => {
    setOverlays((old) => old.slice(0, -1))
  }, [])

  const value = useMemo<OverlayCtx>(() => ({push, pop}), [pop, push])

  return (
    <overlayContext.Provider value={value}>
      <OverlayContainer>{activeOverlay}</OverlayContainer>
      <ChildContainer visible={!activeOverlay}>{children}</ChildContainer>
    </overlayContext.Provider>
  )
}

export function useOverlay() {
  return useContext(overlayContext)
}
