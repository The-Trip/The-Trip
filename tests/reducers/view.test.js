import view from '../../src/reducers/view'

describe('view', () => {
    it('executes setView action', ()=>{
        const initialState = "home";
        const action = {
            type: 'SET_VIEW',
            view: 'trips'
        };

        const expectedState = "trips";
        const outputState = view(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});