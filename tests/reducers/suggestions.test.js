import suggestions from '../../src/reducers/suggestions'

describe('suggestions', () => {
    it('executes suggestionsFromDB action', ()=>{
        const initialState = [];
        const action = {
            type: "RECEIVE_SUGGESTIONS",
            suggestions: ["Tower of London", "Bucks Palace"]
        };

        const expectedState = ["Tower of London", "Bucks Palace"];
        const outputState = suggestions(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});