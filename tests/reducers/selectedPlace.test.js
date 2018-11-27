import selectedPlace from '../../src/reducers/selectedPlace'

describe('selectedPlace', () => {
    it('executes setSelectedPlace action', ()=>{
        const initialState = null;
        const action = {
            type: "STORE_PLACE",
            selectedPlaceID: 5
        };

        const expectedState = 5;
        const outputState = selectedPlace(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});