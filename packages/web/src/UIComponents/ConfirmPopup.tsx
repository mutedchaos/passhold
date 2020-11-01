import React, {ReactNode, useCallback} from 'react'
import styled from 'styled-components'
import {useOverlay} from '../Overlay'
import {BigButton} from './Button'
import PagePrompt from './PagePrompt'

interface Props {
  children: ReactNode
  onClose(confirmed: boolean): void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Link = styled.button`
  background: transparent;
  border: none;
  color: blue;
  cursor: pointer;
  padding: 10px;
  transition: background-color 300ms linear;
  &:hover {
    background: #eef;
  }
`

export default function ConfirmPopup({onClose, children}: Props) {
  const handleConfirm = useCallback(() => onClose(true), [onClose])
  const handleCancel = useCallback(() => onClose(false), [onClose])

  return (
    <Container>
      <PagePrompt>{children}</PagePrompt>
      <BigButton onClick={handleConfirm}>Yes!</BigButton>
      <Link onClick={handleCancel}>Maybe not...</Link>
    </Container>
  )
}

export function useConfirm() {
  const overlay = useOverlay()
  return useCallback(
    async (prompt: ReactNode) => {
      return new Promise((resolve) => {
        const {pop} = overlay.push(
          <ConfirmPopup
            onClose={(confirmed) => {
              pop()
              resolve(confirmed)
            }}
          >
            {prompt}
          </ConfirmPopup>
        )
      })
    },
    [overlay]
  )
}
