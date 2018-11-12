import moment from 'moment'

function startDate(state = moment(), action){
    switch (action.type) {
        case 'UPDATE_START':
            return action.date;
        default:
            return state
    }
}

export default startDate;