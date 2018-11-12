import moment from 'moment'

function endDate(state = moment(), action){
    switch (action.type) {
        case 'UPDATE_END':
            return action.date;
        default:
            return state
    }
}

export default endDate;