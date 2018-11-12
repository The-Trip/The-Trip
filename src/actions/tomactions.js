export function fetchFlights(flyFrom, flyTo, dateFrom, dateTo){
    return function(dispatch){
        return fetch(`https://api.skypicker.com/flights?flyFrom=${flyFrom}&to=${flyTo}&dateFrom=${dateFrom}&dateTo=${dateTo}&max_stopovers=0&curr=GBP`)
            .then(response => response.json())
            .then(data => {
                let arrivalTime = data.data[0].aTime;
                let departureTime = data.data[0].dTime;
                console.log(new Date(departureTime*1000));
                console.log(new Date(arrivalTime*1000));
                dispatch(receiveFlights(data));
            })
    }
}

export function receiveFlights(APIResult) {
    return {
        type: 'RECEIVE_FLIGHTS',
        flightList: APIResult.data
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

export function setCityFrom(city) {
    return {
        type: 'FROM_CITY',
        city: city
    }
}

export function setCityTo(city) {
    return {
        type: 'TO_CITY',
        city: city
    }
}
