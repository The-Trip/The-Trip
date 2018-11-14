import loginForm from '../../src/reducers/loginForm'

describe('loginForm', () => {
    it('executes loginToState action', ()=>{
        const initialState = {};
        const action = {
            type: "SET_LOGIN_INPUT",
            name: "emailField",
            value: "Tom@gmail.com"
        };

        const expectedState = {emailField: "Tom@gmail.com"};
        const outputState = loginForm(initialState, action);

        expect(expectedState).toEqual(outputState)
    })
});