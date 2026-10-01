import { type Flight, flights } from "./flightData.js";
import { addFlight, countFlightsByStatus, doAllFlightsHaveGate, fetchFlights, findFlightByNumber, findFlightsByStatus, getDelayedFlightRoutes, hasCanceledFlight, removeFlight, sortFlightsByDepartureTime, updateFlightStatus, isFlightStatus, isFlight,fetchFlightsResponse, findFlightResponse} from "./flightService.js";
import type { ApiResponse } from "./apiResponse.js";

console.log("--------------Find Flight By its Flight Number");
console.log(findFlightByNumber(flights,"TX23"));
console.log(findFlightByNumber(flights,"UNKNOWN"));//null
console.log(findFlightByNumber(flights,""));//null

console.log("---------------Find Flights By Status---------------");
console.log(findFlightsByStatus(flights,"CANCELED"));
console.log(findFlightsByStatus(flights,"DELAYED"));
// console.log(findFlightsByStatus(flights,"UNKNOWN"));//

console.log("----------Find Routes of Delayed Flights-------------");
console.log(getDelayedFlightRoutes(flights));

console.log("----------Sort Flights By Departure Time(Earliest First)-------------");
console.log(sortFlightsByDepartureTime(flights));

console.log("----------Count Flights By Status-------------");
console.log(countFlightsByStatus(flights));

console.log("----------Is there any canceled flight?-------------");
console.log(hasCanceledFlight(flights))

console.log("----------Do all the flights have gates?------------");
console.log(doAllFlightsHaveGate(flights))
console.log(doAllFlightsHaveGate([]));      // true


console.log("----------Update Flight Status------------");
console.log(updateFlightStatus(flights,"F54K","CANCELED"));
console.log(updateFlightStatus(flights,"C4K6","DELAYED"));

try{
    console.log(updateFlightStatus(flights,"unknown","CANCELED"));
}catch(error){
   if(error instanceof Error){
    console.log(error.message);
   }
   else{
    console.log("There is an error.")
   }
}

console.log("---------------Add Flight---------------");
const flight1:Flight={
    flightNumber:"B5G7",
    origin:"Hanoi",
    destination:"Beijing",
    status:"SCHEDULED",
    departureTime:"2026-09-10T12:10:00Z",
    gate:"B01"
}

const flight2:Flight={
    flightNumber:"H77K",
    origin:"Moscow",
    destination:"Kyiv",
    status:"CANCELED",
    departureTime:"2026-09-10T12:30:00Z",
    gate:"D03"
}
//same flight number.Should return error
const flight3:Flight={
    flightNumber:"C4K6",
    origin:"Hanoi",
    destination:"Beijing",
    status:"SCHEDULED",
    departureTime:"2026-09-10T12:10:00Z",
    gate:"B01"
}
console.log(addFlight(flights,flight1));
console.log(addFlight(flights,flight2));
try{
    console.log(addFlight(flights,flight3));
}catch(error){
    if(error instanceof Error){
        console.log(error.message);
    }
    else{
        console.log("There is an error.")
    }
}



console.log("-------------------Delete Flight------------");
const updatedFlights=removeFlight(flights,"D8K2");
console.log(flights.length);
console.log(updatedFlights.length);
console.log(updatedFlights);
try{
    console.log(removeFlight(flights,"unknown"));
}catch(e){
    if(e instanceof Error){
        console.log(e.message);
    }else{
        console.log("There is an error.");
    }
}
console.log("--------------------Add,update,delete flight---------------");
let currentFlights: Flight[] = [...flights];

currentFlights = addFlight(currentFlights, flight1);
currentFlights = addFlight(currentFlights, flight2);
currentFlights = updateFlightStatus(
    currentFlights,
    "F54K",
    "CANCELED"
);
currentFlights = removeFlight(currentFlights, "D8K2");
console.log("Original count:", flights.length);
console.log("Current count:", currentFlights.length);

console.log("---------------Fetch Flights-----------");

async function loadFlights(shouldFail:boolean=false):Promise<void>{
    let loading=true;
    console.log("Loading: ", loading);
    try{
        const response=await fetchFlights(flights,shouldFail);
        console.log("Flights loaded.");
        console.table(response);

    }catch(error){
        if(error instanceof Error){
            console.log("Loading failed:" , error.message);
       }
       else{
            console.log("Loading failed.")
       }
    }finally{
        loading=false;
        console.log("Loading: " ,loading);
}
  
}

await loadFlights(true);
await loadFlights(false);

console.log("-----------------Type Guard of Flight Status---------------");
console.log(isFlightStatus("DELAYED")); // true
console.log(isFlightStatus("UNKNOWN")); // false
console.log(isFlightStatus(123));       // false
console.log(isFlightStatus(null));      // false

//Type narrowing
console.log("---------------Type guards examples(Type Narrowing)------------")
const incomingStatus:unknown="CANCELED";
if(isFlightStatus(incomingStatus)){
    console.log(findFlightsByStatus(flights,incomingStatus));
}
else{
    console.log("Invalid Flight Staus.");
}

console.log("----------Validate Flight----------");

console.log(isFlight(flights[0])); // true
console.log(isFlight(null));       // false
console.log(isFlight([]));         // false
console.log(isFlight({}));         // false

console.log(isFlight({
    ...flights[0],
    status: "UNKNOWN"
})); // false

console.log(isFlight({
    ...flights[0],
    departureTime: "abc"
})); // false

console.log(isFlight({
    ...flights[0],
    origin: "   "
})); // false


console.log("------------------Api Response---------------")
// const flightResult:ApiResponse<Flight[]>={
//     success:true,
//     data:[...flights]
// }
// const errorResult:ApiResponse<Flight[]>={
//     success:false,
//     error:"Flights could not be loaded."
// }

// // console.log(flightResult)
// // console.log(errorResult)

function showApiResponse(response: ApiResponse<Flight[]>): void {
    if (response.success) {
        console.table(response.data);
    } else {
        console.log(response.error);
    }
}
// showApiResponse(flightResult);
// showApiResponse(errorResult);

// const loadedFlights=await fetchFlights(flights,false);

// const res:ApiResponse<Flight[]>={
//     success:true,
//     data:loadedFlights
    

// }
// showApiResponse(res);

const successResponse = await fetchFlightsResponse(flights, false);
showApiResponse(successResponse); // Uçuş tablosu

const failureResponse = await fetchFlightsResponse(flights, true);
showApiResponse(failureResponse); // Hata mesajı

console.log("------------Api response for one flight-------------");
const result=findFlightResponse(flights,"A2X7");
if(result.success){
    console.log(`${result.data.origin}-->${result.data.destination} `)
}
else{
    console.log(result.error);
}
const failure=findFlightResponse(flights,"unknown");
if(failure.success){
    console.log(`${failure.data.origin}-->${failure.data.destination} `)
}
else{
    console.log(failure.error);
}