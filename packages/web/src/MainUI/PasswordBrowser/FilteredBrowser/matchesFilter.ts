import {Entry, Group} from 'kdbxweb'
import {escapeRegExp, flatten} from 'lodash'

export default function matchesFilter(entry: Entry, filter: string): boolean {
  const totalMatchable = toMatchable(entry)

  const potentials = [...filter].reduce(
    (options, char) => {
      const escapedChar = escapeRegExp(char)
      return flatten(
        options.map((option) => {
          const matched = (option?.match(new RegExp(`(^| )${escapedChar}.*`, 'g')) ?? []).map((match) =>
            match.startsWith(char) ? match.substring(1) : match.substring(2)
          )
          //console.log(filter, totalMatchable, option, char, matched)
          return matched
        })
      )
    },
    [totalMatchable]
  )

  return potentials.length > 0
}

function toMatchable(entry: Entry) {
  return [...getFullGroupName(entry.parentGroup), entry.fields.Title.toString()].join(' ')
}

function getFullGroupName(group: Group): string[] {
  if (group.parentGroup) {
    return [...getFullGroupName(group.parentGroup), group.name.toString()]
  }
  return [group.name.toString()]
}
