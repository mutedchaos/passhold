import matchesFilter from './matchesFilter'

describe('matchesFilter', () => {
  describe('match', () => {
    it('no filter', function () {
      expectMatch('', '')
    })

    it('exact', function () {
      expectMatch('abc', 'abc')
    })

    it('after space', function () {
      expectMatch('abc', 'qq abc')
    })

    it('prefix', function () {
      expectMatch('ab', 'abc')
    })

    it('multiword', function () {
      expectMatch('ab', 'alfa bravo')
    })
  })

  describe('no match', function () {
    it('non-start', function () {
      expectMatch('ab', 'cab', false)
    })
  })

  function expectMatch(filter: string, itemText: string, expectation = true) {
    const entry: any = {
      fields: {
        Title: itemText,
      },
      parentGroup: {
        name: '',
      },
    }
    expect(matchesFilter(entry, filter)).toEqual(expectation)
  }
})
