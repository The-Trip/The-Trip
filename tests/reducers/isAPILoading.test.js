import isAPILoading from '../../src/reducers/isAPILoading'

describe('isAPILoading', () => {
    it('runs the isAPILoading action', ()=>{
        const initialState = false;
        const action = {
            type: 'IS_LOADING'
        };

        const expectedState = true;
        const outputState = isAPILoading(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});