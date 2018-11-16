import {mapStateToProps} from '../../src/containers/TripsListContainer.js'

describe('mapStateToProps', () => {
    it('should extract trips and userId from state', () => {

        const state = {
            trips: ["New York", "London"],
            user: {id:4}
        };

        const expectedOutput = {
            trips: ["New York", "London"],
            userId: 4
        };

        const output = mapStateToProps(state);

        expect(output).toEqual(expectedOutput)

    })
});