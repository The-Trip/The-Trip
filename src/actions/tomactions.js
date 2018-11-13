export function fetchFlights(flyFrom, flyTo, dateFrom, dateTo){
    return function(dispatch){
        return fetch(`https://api.skypicker.com/flights?flyFrom=${flyFrom}&to=${flyTo}&dateFrom=${dateFrom}&dateTo=${dateFrom}&returnFrom=${dateTo}&returnTo=${dateTo}&max_stopovers=0&curr=GBP&limit=5`)
            .then(response => response.json())
            .then(data => {
                dispatch(receiveFlights(data));
                dispatch(isAPILoading())
            })
    }
}

export function receiveFlights(APIResult) {
    return {
        type: 'RECEIVE_FLIGHTS',
        flightList: APIResult
    }
}

export function setStartDate(date) {
    return {
        type: 'UPDATE_START',
        date: date
    }
}

export function setEndDate(date) {
    return {
        type: 'UPDATE_END',
        date: date
    }
}

export function isAPILoading() {
    return {
        type: 'IS_LOADING'
    }
}
