import googlePlaceInfo from '../../src/reducers/googlePlaceInfo'

describe('googlePlaceInfo', () => {
    it('executes storeGoogleFetch action', ()=>{
        const initialState = [];
        const action = {
            type: "STORE_GOOGLE",
            destinationInfo: ["London", "Paris", "Rome"]
        };

        const expectedState = ["London", "Paris", "Rome"];
        const outputState = googlePlaceInfo(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});