import { expect } from 'chai'
import * as actions from '../../../app/actions/actions'

describe('.changeSearchText', () => {
  it('should create an action to change search text', () => {
    const text = 'Change Text'
    const expectedAction = {
      type: actions.CHANGE_SEARCH_TEXT,
      text
    }
    expect(actions.changeSearchText(text)).to.deep.equal(expectedAction)
  })
})
