import trips from '../../src/reducers/trips'

describe('trips', () => {
    it('executes receiveTrips action', ()=>{
        const initialState = [];
        const action = {
            type: 'RECEIVE_TRIPS',
            trips: ["Paris", "London", "New York"]
        };

        const expectedState = ["Paris", "London", "New York"];
        const outputState = trips(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});