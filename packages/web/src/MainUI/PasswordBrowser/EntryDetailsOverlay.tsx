import {Entry} from 'kdbxweb'
import React, {useCallback} from 'react'
import {useOverlay} from '../../Overlay'
import {useBackButton} from '../../UIComponents/goBackContext'
import EntryDetails from './DefaultMode/EntryDetails'

interface Props {
  entry: Entry
}

export default function EntryDetailsOverlay({entry}: Props) {
  const overlay = useOverlay()
  const close = useCallback(() => overlay.pop(), [overlay])
  useBackButton(close)
  return <EntryDetails entry={entry} />
}
