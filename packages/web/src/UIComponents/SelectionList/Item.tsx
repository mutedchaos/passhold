import React from 'react'
import {ReactNode} from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode
  onClick(): void
}

const Container = styled.div`
  padding: 20px;
  background: yellow;
  cursor: pointer;
  &:hover {
    background: orange;
  }
`

export default function Item({children, onClick}: Props) {
  return <Container onClick={onClick}>{children}</Container>
}
