import suggestionForm from '../../src/reducers/suggestionForm'

describe('suggestionForm', () => {
    it('executes suggestionsForm action', ()=>{
        const initialState = {};
        const action = {
            type: "SET_SUGGESTION_INPUT",
            name: "suggester",
            value: "Tom"
        };

        const expectedState = {suggester: "Tom"};
        const outputState = suggestionForm(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});