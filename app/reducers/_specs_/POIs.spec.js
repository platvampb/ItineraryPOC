import { expect } from 'chai'
import reducer from '../../../app/reducers/POIs'

describe('.POI', () => {
	describe('case:default', () => {
		it('should return input state with no input and non-existent action', () => {
	    const action = {
				type: 'Random'
			}
	    const state = {}
	    expect(reducer(state, action)).to.equal(state)
	  })
	})
})
