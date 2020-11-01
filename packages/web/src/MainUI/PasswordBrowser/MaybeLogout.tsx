import React from 'react'
import styled from 'styled-components'
import {BigButton} from '../../UIComponents/Button'
import PagePrompt from '../../UIComponents/PagePrompt'

interface Props {
  onCancel(): void
  onLogout(): void
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

export default function MaybeLogout({onCancel, onLogout}: Props) {
  return (
    <Container>
      <PagePrompt>Close the database?</PagePrompt>
      <BigButton onClick={onLogout}>Yes!</BigButton>
      <Link onClick={onCancel}>Maybe not...</Link>
    </Container>
  )
}
