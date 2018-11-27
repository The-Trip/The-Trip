import {mapStateToProps} from '../../src/containers/TripContainer.js'

describe('mapStateToProps', () => {
    it('should extract tripID, trip and userID from state', () => {

        const ownProps = {
            match: {
                params: {
                    id: "5"
                }
            }
        };

        const state = {
            trips: [{id:4}, {id:5, destination: "New York"}],
            user: {id:6,name:"Tom"}
            };

        const expectedOutput ={
            tripId: 5,
            trip: {id:5, destination: "New York"},
            userId: 6
        };

        const output = mapStateToProps(state, ownProps);

        expect(output).toEqual(expectedOutput)

    })
});