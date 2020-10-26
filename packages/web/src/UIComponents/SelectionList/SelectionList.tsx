import React from 'react'
import {ReactNode, useCallback} from 'react'
import styled from 'styled-components'
import Item from './Item'

interface Props<T> {
  items: T[]
  getKey(item: T): string
  renderItem(item: T): ReactNode
  onSelect(item: T): void
}

const Container = styled.div``

export default function SelectionList<T>({items, renderItem, onSelect, getKey}: Props<T>) {
  const renderItemInternal = useCallback(
    (item: T) => {
      return (
        <React.Fragment key={getKey(item)}>
          <Item onClick={() => onSelect(item)}>{renderItem(item)}</Item>
        </React.Fragment>
      )
    },
    [getKey, onSelect, renderItem]
  )
  return <Container>{items.map(renderItemInternal)}</Container>
}
