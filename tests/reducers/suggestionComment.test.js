import comments from '../../src/reducers/suggestionComment'

describe('suggestionComment', () => {
    it('executes comments action', ()=>{
        const initialState = [];
        const action = {
            type: "SET_COMMENT_INPUT",
            name: "comment",
            value: "This place is excellent"
        };

        const expectedState = "This place is excellent";
        const outputState = comments(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});