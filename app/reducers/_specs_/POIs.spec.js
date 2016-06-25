import { expect } from 'chai'
import reducer from '../../../app/reducers/POIs'
import { SELECT_CITY, RECEIVE_POIS, DRAG_MOVE } from '../../../app/actions/actions'

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
