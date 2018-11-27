import {mapStateToProps} from '../../src/containers/HomeContainer.js'

describe('mapStateToProps', () => {
    it('should extract view from state', () => {

        const state = {
            view: 'Home'
        };

        const expectedOutput = {
            view: 'Home'
        };

        const output = mapStateToProps(state);

        expect(output).toEqual(expectedOutput)

    })
});