import {mapStateToProps} from '../../src/containers/SuggestionInputContainer.js'

describe('mapStateToProps', () => {
    it('should extract suggestionInput and tripId from state', () => {

        const ownProps = {
            tripId: 4
        };

        const state = {
            suggestionInput: "Hey this is a suggestion",
        };

        const expectedOutput ={
            tripId: 4,
            suggestionInput: "Hey this is a suggestion"
        };

        const output = mapStateToProps(state, ownProps);

        expect(output).toEqual(expectedOutput)

    })
});