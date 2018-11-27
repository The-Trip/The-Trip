import endDate from '../../src/reducers/endDate'

describe('endDate', () => {
    it('executes setEndDate action', ()=>{
        const initialState = "12/11/2018";
        const action = {
            type: 'UPDATE_END',
            date: "15/11/2018"
        };

        const expectedState = "15/11/2018";
        const outputState = endDate(initialState, action)

        expect(expectedState).toEqual(outputState)
    })
});