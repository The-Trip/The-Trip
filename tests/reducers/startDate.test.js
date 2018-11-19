import startDate from '../../src/reducers/startDate'

describe('startDate', () => {
    it('executes setStartDate action', ()=>{
        const initialState = "12/11/2018";
        const action = {
            type: 'UPDATE_START',
            date: "15/11/2018"
        };

        const expectedState = "15/11/2018";
        const outputState = startDate(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});