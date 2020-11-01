import React from 'react'
import {ReactNode} from 'react'
import styled from 'styled-components'
import {GoBackContextProvider} from './goBackContext'
import Header from './Header'

interface Props {
  children: ReactNode
}

const Body = styled.div`
  border-color: #eee;
  border-style: solid;
  border-width: 0 calc(100vw / 2 - 600px);
  padding: 20px;
`

export default function MainLayout({children}: Props) {
  return (
    <div>
      <GoBackContextProvider>
        <Header />
        <Body>{children}</Body>
      </GoBackContextProvider>
    </div>
  )
}
