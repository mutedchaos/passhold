import React from 'react'
import {ReactNode} from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode
  onClick(): void
}

const Container = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 200ms linear;
  &:hover {
    background: #deecf1;
  }
  border-bottom: 1px dotted lightgray;
  &:first-child {
    border-top: 1px dotted lightgray;
  }
`

export default function Item({children, onClick}: Props) {
  return <Container onClick={onClick}>{children}</Container>
}
