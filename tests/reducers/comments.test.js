import commentsToRedux from '../../src/reducers/comments'

describe('commentsToRedux', () => {
    it('executes receiveComments action', ()=>{
        const initialState = [];
        const action = {
            type: "STORE_COMMENTS",
            comments: ["This place rocks","Amazing Value"]
        };

        const expectedState = ["This place rocks","Amazing Value"];
        const outputState = commentsToRedux(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});