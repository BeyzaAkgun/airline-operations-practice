import { findFlightByNumber,findFlightsByStatus,getDelayedFlightRoutes, sortFlightsByDepartureTime,countFlightsByStatus, hasCanceledFlight, doAllFlightsHaveGate, updateFlightStatus, addFlight,removeFlight,fetchFlights } from "./flightService.js";
import { flights, FlightStatus } from "./flightData.js";

console.log("----Find Flight By Flight Number-----");
console.log(findFlightByNumber(flights,"C4K6"));
console.log(findFlightByNumber(flights,"UNKNOWN"));

console.log("----Find Flight By Flights Status-----");
try {
    console.log(
        findFlightsByStatus(flights, FlightStatus.CANCELED)
    );
} catch (error) {
    console.log(error.message);
}

try {
    console.log(
        findFlightsByStatus(flights, "UNKNOWN")
    );
} catch (error) {
    console.log(error.message);
}

console.log("----Get Delayed Flight Routes-----");
console.log(getDelayedFlightRoutes(flights));


console.log("----Sort Flights By Departure Time-----");
console.log(sortFlightsByDepartureTime(flights));

console.log("---- Flight Count by Status ----");
console.log(countFlightsByStatus(flights));

console.log("---- Is there a cancelled flight? ----");
console.log(hasCanceledFlight(flights));

console.log("---- Do all flights have gates? ----");
console.log(doAllFlightsHaveGate(flights));

console.log("---- Update the flight status ----");
try{
console.log(updateFlightStatus(flights,"C4K6",FlightStatus.CANCELED));
}catch(error){
    console.log(error.message);
};
try{
console.log(updateFlightStatus(flights,"A555",FlightStatus.DELAYED));
}catch(error){
    console.log(error.message);
};
try{
console.log(updateFlightStatus(flights,"C4K6","UNKNOWN"));
}catch(error){
    console.log(error.message);
}

// console.log(findFlightByNumber(flights,"C4K6"));

console.log("----------------Add new flight-----------------")
const newFlight={
        flightNumber: "B17K",
        origin: "Bursa",
        destination: "Kastamonu",
        status: FlightStatus.DELAYED,
        departureTime: "2026-09-10T08:42:00Z",
        gate: "B05"
};

const newFlight2={};
const newFlight3="";

try{
    console.log(addFlight(flights,newFlight));
        
}catch(error){
    console.log(error)
}

try{
    console.log(addFlight(flights,newFlight2));
        
}catch(error){
    console.log(error)
}
try{
    console.log(addFlight(flights,newFlight3));
        
}catch(error){
    console.log(error)
}

try {
    const updatedFlights = addFlight(flights, newFlight);

    console.log("Original:", flights.length);       // 5
    console.log("Updated:", updatedFlights.length); // 6

    addFlight(updatedFlights, newFlight); // Duplicate hatası
} catch (error) {
    console.log(error.message);
}

console.log("--------------Remove flight------------------");
try {
    const remainingFlights = removeFlight(flights, "TX23");

    console.log("Original count:", flights.length);          // 5
    console.log("Remaining count:", remainingFlights.length); // 4

    // Yeni listeden aynı uçuşu tekrar silmeyi dene.
    removeFlight(remainingFlights, "TX23");
} catch (error) {
    console.log(error.message);
}


console.log("-------------------Async load flights-------------------------")
async function loadFlights(shouldFail=false){
    let loading=true;
    console.log("Loading: ", loading);
    try{
       const loadedFlights=await fetchFlights(flights,shouldFail);
    //    console.log("Flights loaded: ", loadedFlights);
       console.log("Flights loaded:");
       console.table(loadedFlights);
    }catch(error){
        console.log("Loading failed: "+ error.message);
    }finally{
        loading=false;
        console.log("Loading: "+ loading);

    }

}
await loadFlights();     // Başarılı senaryo
await loadFlights(true); // Hatalı senaryo


console.log("-----------------Type Guard of Flight Status---------------");
console.log(isFlightStatus("DELAYED")); // true
console.log(isFlightStatus("UNKNOWN")); // false
console.log(isFlightStatus(123));       // false
console.log(isFlightStatus(null));      // false