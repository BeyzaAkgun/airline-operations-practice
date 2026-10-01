import { FlightStatus } from "./flightData.js";

export function findFlightByNumber(flights, flightNumber) {
    const flight=flights.find((flight)=>flight.flightNumber===flightNumber);
    if (flight===undefined){
        return null;
    }
    return flight;


}
// let result=null;

// flights.forEach((flight)=>
//     if(flight.flightNumber===flightNumber && result===null){
//         result=flight
//     }
    
// )
// return result;
    // find() kullanarak eşleşen uçuşu döndür.
    // for(let flight of flights){
    //     if(flight.flightNumber==flightNumber){
    //         return flight;
    //     }
    // }
    // return null;

   
export function findFlightsByStatus(flights, flightStatus) {
    if (!Object.values(FlightStatus).includes(flightStatus)) {
        throw new Error(`Flight status ${flightStatus} is invalid.`);
    }

    return flights.filter(
        flight => flight.status === flightStatus
    );
}

export function getDelayedFlightRoutes(flights){
    const delayedFlights=findFlightsByStatus(flights,FlightStatus.DELAYED);
    const flightRoutes=delayedFlights.map(flight=>`${flight.flightNumber} : ${flight.origin} --> ${flight.destination}`);
    return flightRoutes;
}

export function sortFlightsByDepartureTime(flights){
    const sortedFlights=[...flights].sort((a,b)=> new Date(a.departureTime)- new Date(b.departureTime));
    return sortedFlights;
}


export function countFlightsByStatus(flights){
    const finalResult=flights.reduce((acc,flight)=>{
        acc[flight.status]=(acc[flight.status]|| 0)+1
        return acc;

    },{})
    return finalResult;


}

export function hasCanceledFlight(flights) {
    const cancelledFlight=flights.some(flight=>flight.status===FlightStatus.CANCELED);
    return cancelledFlight;

}

export function doAllFlightsHaveGate(flights) {
    // every(): Bütün uçuşların gate alanı dolu mu?
    const flightsWithGates=flights.every(flight=>typeof flight.gate==="string" && flight.gate.trim()!=="" )
    return flightsWithGates;
}

export function updateFlightStatus(flights,flightNumber,newStatus){
    // const existingFlight = findFlightByNumber(flights, flightNumber);

    // if (existingFlight === null) {
    //     throw new Error(`Flight ${flightNumber} cannot be found.`);
    // }

    // if (!Object.values(FlightStatus).includes(newStatus)) {
    //     throw new Error(`Flight status ${newStatus} does not exist.`);
    // }

    // const updatedFlight = { ...existingFlight };
    // const newFlights = [...flights];

    // updatedFlight.status = newStatus;

    // const index = newFlights.findIndex(
    //     flight => flight.flightNumber === flightNumber
    // );

    // newFlights[index] = updatedFlight;

    // return newFlights;

    const existingFlight=findFlightByNumber(flights,flightNumber);
    if (existingFlight === null) {
        throw new Error(`Flight ${flightNumber} can not be found.`);
    }

    if (!Object.values(FlightStatus).includes(newStatus)) {
        throw new Error(`Flight status ${newStatus} does not exist.`);
    }

    const newFlights=flights.map(flight=>{
        if(flight.flightNumber===flightNumber){
            return {
                ...flight,
                status:newStatus
            }
        }
        return flight;
    })

    return newFlights;

    
}

export function addFlight(flights, newFlight){
    if(newFlight===null || newFlight===undefined){
        throw new Error("Flight cannot be null or undefined.");
    }
    if(typeof newFlight.flightNumber!=="string" || newFlight.flightNumber.trim()===""){
        throw new Error("Flight number must be a non-empty string.");
    };
   if(typeof newFlight.origin!=="string" || newFlight.origin.trim()===""){
    throw new Error("Origin must be a non-empty string.")
   }
    if(typeof newFlight.destination!=="string" || newFlight.destination.trim()===""){
    throw new Error("Destination must be a non-empty string.");
   }
   if(!Object.values(FlightStatus).includes(newFlight.status)){
    throw new Error("Flight status is invalid.");
   }
   if(typeof newFlight.departureTime!=="string"|| newFlight.departureTime.trim()==="" || Number.isNaN(Date.parse(newFlight.departureTime))){
      throw new Error("Departure time must be a valid date-time string.")
   }
   if(typeof newFlight.gate!=="string"){
     throw new Error("Gate must be a string. Use an empty string if unassigned.");
   }

   const existingFlight=findFlightByNumber(flights,newFlight.flightNumber);

    if(existingFlight!==null){
        throw new Error(`Flight ${newFlight.flightNumber} already exists.`)
    }

    const newFlights=[...flights];
    newFlights.push(newFlight);
    return newFlights;
}


export function removeFlight(flights,flightNum){
    if(typeof flightNum!=="string"|| flightNum.trim()===""){
        throw new Error("Flight number must be non empty string.");
    }
    const existingFlight=findFlightByNumber(flights,flightNum);
    if(existingFlight===null){
        throw new Error(`Flight ${flightNum} cannot be found.`)
    }

    const newFlights=flights.filter(flight=>flight.flightNumber!==flightNum);
    return newFlights;

    //     const index = flights.findIndex(
    //     flight => flight.flightNumber === flightNumber
    // );

    // if (index === -1) {
    //     throw new Error(`Flight ${flightNumber} cannot be found.`);
    // }

    // const newFlights = [...flights];
    // newFlights.splice(index, 1);

    // return newFlights;

}

export function fetchFlights(flights, shouldFail = false) {

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(shouldFail){
                reject(new Error("Flights can not be returned."));
            }
            else{
                resolve(flights);
            }

        },1000)

    })
   

}