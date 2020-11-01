import React from 'react'
import {ReactNode} from 'react'
import styled from 'styled-components'

interface Props {
  label: ReactNode
  children: ReactNode
}

const Label = styled.div`
  display: block;
  font-size: 0.75em;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 30px;
  margin-bottom: 20px;
`

export default function LabeledElement({label, children}: Props) {
  return (
    <Container>
      <Label>{label}</Label>
      {children}
    </Container>
  )
}
