import addedTripId from '../../src/reducers/addedTripId'

describe('addedTripId', () => {
    it('executes setAddedTripId action', ()=>{
        const initialState = null;
        const action = {
            type: "SET_ADDED_TRIP_ID",
            tripId: 5
        };

        const expectedState = 5;
        const outputState = addedTripId(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});