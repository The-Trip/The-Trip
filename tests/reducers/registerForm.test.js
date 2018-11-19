import registerForm from '../../src/reducers/registerForm'

describe('registerForm', () => {
    it('executes registerToState action', ()=>{
        const initialState = {};
        const action = {
            type: "SET_REGISTER_INPUT",
            name: "nameField",
            value: "Tom"
        };

        const expectedState = {nameField: "Tom"};
        const outputState = registerForm(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});