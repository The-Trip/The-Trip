import tripForm from '../../src/reducers/tripForm'

describe('tripForm', () => {
    it('executes setTripState action', ()=>{
        const initialState = {};
        const action = {
            type: 'SET_TRIP_STATE',
            name: 'tripName',
            value: 'Our Big Trip Away',
        };

        const expectedState = {
            tripName: 'Our Big Trip Away'
        };
        const outputState = tripForm(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});