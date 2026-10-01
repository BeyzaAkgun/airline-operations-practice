import type { Flight, FlightStatus } from "./flightData.js";
import type { ApiResponse } from "./apiResponse.js";


export function findFlightByNumber(flights:readonly Flight[],flightNum:string):Flight|null{
    const flight=flights.find(flight=>flight.flightNumber===flightNum);
    return flight??null;
}

export function findFlightsByStatus(flights:readonly Flight[],newStatus:FlightStatus):Flight[]{
    const statuFlights=flights.filter(flight=>flight.status===newStatus);
    return statuFlights;

}

export function getDelayedFlightRoutes(flights:readonly Flight[]):string[] {
    const delayedFlights=flights.filter(flight=>flight.status==="DELAYED");
    const flightRoutes=delayedFlights.map(flight=>`${flight.flightNumber}: ${flight.origin} --> ${flight.destination} `)
    return flightRoutes;
}


export function sortFlightsByDepartureTime(flights:readonly Flight[]):Flight[]{
    const sortedFlights=[...flights].sort((a,b)=>new Date(a.departureTime).getTime()- new Date(b.departureTime).getTime())
    return sortedFlights;

}

export function countFlightsByStatus(flights:readonly Flight[]):Record<FlightStatus,number>{
    const statusCount=flights.reduce<Record<FlightStatus,number>>((acc,flight)=>{
        acc[flight.status]=acc[flight.status]+1;
        return acc;
    },
    {DELAYED:0,
    CANCELED:0,
    SCHEDULED:0}
)

    return statusCount;

}


export function hasCanceledFlight(flights:readonly Flight[]):boolean{
    return flights.some(flight=>flight.status === "CANCELED");
}

export function doAllFlightsHaveGate(flights:readonly Flight[]):boolean{
    return flights.every(flight=>flight.gate.trim()!=="");
}

export function updateFlightStatus(flights:readonly Flight[],flightNumber:string,newStatus:FlightStatus):Flight[]{
    const existingFlight=findFlightByNumber(flights,flightNumber);
    if(existingFlight===null){
        throw new Error("Flight can not be found.");
    };
    const updatedFlights=flights.map(flight=>{
        if(flight.flightNumber===flightNumber){
            return{
                ...flight,
                status:newStatus
            }
        }
        return flight

    })
    return updatedFlights;

}


export function addFlight(flights:readonly Flight[],newFlight:Flight):Flight[]{
    const doesExist=findFlightByNumber(flights,newFlight.flightNumber);
    if(doesExist!==null){
        throw new Error("The flight you are trying to add already exists.");
    }
    const tempFlights=[...flights]
    tempFlights.push(newFlight);
    return tempFlights;

}

export function removeFlight(flights:readonly Flight[],flightNumber:string):Flight[]{
    const doesExist=findFlightByNumber(flights,flightNumber);
    if(doesExist===null){
        throw new Error("The flight you are trying to delete does not exist.");
    }
    const tempFlights=flights.filter(flight=>flight.flightNumber!==flightNumber)
    return tempFlights
    

}

export function fetchFlights(flights:readonly Flight[],shouldFail:boolean=false):Promise<Flight[]>{
    return new Promise<Flight[]>((resolve,reject)=>setTimeout(() => {
        if(shouldFail){
            reject(new Error("Flights can not be returned"));
        }
        else{
            resolve([...flights]);
        }
       
        
    }, 1000))

}

//typeguards

export function isFlightStatus(value:unknown):value is FlightStatus{
    if(typeof value==="string" && (value==="CANCELED" || value==="DELAYED"||value==="SCHEDULED")){
        return true;
    }
    return false;
   
}

export function isFlight(value: unknown): value is Flight {
    if (
        typeof value !== "object" ||
        value === null ||
        Array.isArray(value)
    ) {
        return false;
    }

    if (
        !("flightNumber" in value) ||
        typeof value.flightNumber !== "string" ||
        value.flightNumber.trim() === ""
    ) {
        return false;
    }

    if (
        !("origin" in value) ||
        typeof value.origin !== "string" ||
        value.origin.trim() === ""
    ) {
        return false;
    }

    if (
        !("destination" in value) ||
        typeof value.destination !== "string" ||
        value.destination.trim() === ""
    ) {
        return false;
    }

    if (!("status" in value) || !isFlightStatus(value.status)) {
        return false;
    }

    if (
        !("departureTime" in value) ||
        typeof value.departureTime !== "string" ||
        value.departureTime.trim() === ""
    ) {
        return false;
    }
    if(Number.isNaN(new Date(value.departureTime).getTime())){
        return false;
    }

    if (!("gate" in value) || typeof value.gate !== "string") {
        return false;
    }

    return true;
}

export async function fetchFlightsResponse(flights:readonly Flight[],shouldFail:boolean=false):Promise<ApiResponse<Flight[]>>{
    try{
        const loadedFlights=await fetchFlights(flights,shouldFail);
        const res:ApiResponse<Flight[]>={
            success:true,
            data:loadedFlights
        }
        return res;
    }catch(error){
        if(error instanceof Error){
            const err:ApiResponse<Flight[]>={
                success:false,
                error:error.message

            }
            return err;
        }
        else{
            const err:ApiResponse<Flight[]>={
                success:false,
                error:"Unexpected error."

            }
            return err;           

        }
        
    }
}


export function findFlightResponse(flights: readonly Flight[],flightNumber: string): ApiResponse<Flight> {
    const flight=findFlightByNumber(flights,flightNumber);
    if(flight===null){
        const res:ApiResponse<Flight>={
            success:false,
            error:"Flight not found"
        }
        return res;
    }
    const res:ApiResponse<Flight>={
        success:true,
        data:{...flight}
    }
    return res

}