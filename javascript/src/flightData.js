export const FlightStatus=Object.freeze({
    DELAYED:"DELAYED",
    CANCELED:"CANCELED",
    SCHEDULED:"SCHEDULED"
});

export const flights=[{
    flightNumber:"TX23",
    origin:"Istanbul",
    destination:"Antalya",
    status:FlightStatus.DELAYED,
    departureTime: "2026-09-10T10:00:00Z",
    gate: "A12"

},
 {
        flightNumber: "A2X7",
        origin: "Berlin",
        destination: "Izmir",
        status: FlightStatus.CANCELED,
        departureTime: "2026-09-10T08:30:00Z",
        gate: "B04"
    },
    {
        flightNumber: "C4K6",
        origin: "Rome",
        destination: "Los Angeles",
        status: FlightStatus.SCHEDULED,
        departureTime: "2026-09-10T14:00:00Z",
        gate: ""
    },
    {
        flightNumber: "D8K2",
        origin: "Madrid",
        destination: "Paris",
        status: FlightStatus.CANCELED,
        departureTime: "2026-09-10T07:15:00Z",
        gate: "C08"
    },
    {
        flightNumber: "F54K",
        origin: "Seul",
        destination: "Tokyo",
        status: FlightStatus.SCHEDULED,
        departureTime: "2026-09-10T11:45:00Z",
        gate: "D02"
    }
];