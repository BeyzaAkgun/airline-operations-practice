package com.beyzaakgun.airline;

public class Main {

    public static void main(String[] args) {
        Flight f1 = new Flight(
                "TX23", "Istanbul", "Antalya", FlightStatus.DELAYED
        );
        Flight f2 = new Flight(
                "A2X7", "Berlin", "Izmir", FlightStatus.CANCELED
        );
        Flight f3 = new Flight(
                "C4K6", "Rome", "Los Angeles", FlightStatus.SCHEDULED
        );
        Flight f4 = new Flight(
                "D8K2", "Madrid", "Paris", FlightStatus.CANCELED
        );
        Flight f5 = new Flight(
                "F54K", "Seul", "Tokyo", FlightStatus.SCHEDULED
        );

        FlightService flightService = new FlightService();

        flightService.addFlight(f1);
        flightService.addFlight(f2);
        flightService.addFlight(f3);
        flightService.addFlight(f4);
        flightService.addFlight(f5);

        System.out.println("=== Flight details ===");
        System.out.println(f1.getDestination());
        System.out.println(f1.getFlightNumber());
        System.out.println(f1.getOrigin());
        System.out.println(f1.getStatus());
        System.out.println(f1);

        System.out.println("\n=== All flights ===");
        System.out.println(flightService.getFlights());

        System.out.println("\n=== Flight count by status ===");
        System.out.println(flightService.getFlightCountByStatus());

        System.out.println("\n=== Find flight by number ===");
        System.out.println(
                flightService.findFlightByNumber("D8K2")
        );
        System.out.println(
                flightService.findFlightByNumber("CMK7")
        ); // null
        System.out.println(
                flightService.findFlightByNumber("F54K")
        );

        System.out.println("\n=== Filter flights by status ===");
        System.out.println(
                flightService.findFlightsByStatus(FlightStatus.DELAYED)
        );
        System.out.println(
                flightService.findFlightsByStatus(FlightStatus.CANCELED)
        );
        System.out.println(
                flightService.findFlightsByStatus(FlightStatus.SCHEDULED)
        );

        System.out.println("\n=== Update flight status ===");

        try {
            flightService.updateFlightStatus(
                    "F54K", FlightStatus.DELAYED
            );
            System.out.println(
                    flightService.findFlightByNumber("F54K")
            );
        } catch (IllegalArgumentException | FlightNotFoundException e) {
            System.out.println("Update failed: " + e.getMessage());
        }

        try {
            flightService.updateFlightStatus(
                    "C4K6", FlightStatus.CANCELED
            );
            System.out.println(
                    flightService.findFlightByNumber("C4K6")
            );
        } catch (IllegalArgumentException | FlightNotFoundException e) {
            System.out.println("Update failed: " + e.getMessage());
        }

        try {
            flightService.updateFlightStatus(
                    "UNKNOWN", FlightStatus.CANCELED
            );
        } catch (IllegalArgumentException | FlightNotFoundException e) {
            System.out.println("Update failed: " + e.getMessage());
        }

        try {
            flightService.updateFlightStatus(
                    "   ", FlightStatus.DELAYED
            );
        } catch (IllegalArgumentException | FlightNotFoundException e) {
            System.out.println("Update failed: " + e.getMessage());
        }

        try {
            flightService.updateFlightStatus("F54K", null);
        } catch (IllegalArgumentException | FlightNotFoundException e) {
            System.out.println("Update failed: " + e.getMessage());
        }

        System.out.println("\n=== Remove flight ===");

        try {
            flightService.removeFlight("TX23");
            System.out.println("Flight removed: TX23");
        } catch (IllegalArgumentException | FlightNotFoundException e) {
            System.out.println("Removal failed: " + e.getMessage());
        }

        // İkinci silme başarısız olmalı: Uçuş zaten silindi.
        try {
            flightService.removeFlight("TX23");
        } catch (IllegalArgumentException | FlightNotFoundException e) {
            System.out.println("Removal failed: " + e.getMessage());
        }

        try {
            flightService.removeFlight("UNKNOWN");
        } catch (IllegalArgumentException | FlightNotFoundException e) {
            System.out.println("Removal failed: " + e.getMessage());
        }

        try {
            flightService.removeFlight(null);
        } catch (IllegalArgumentException | FlightNotFoundException e) {
            System.out.println("Removal failed: " + e.getMessage());
        }

        try {
            flightService.removeFlight("   ");
        } catch (IllegalArgumentException | FlightNotFoundException e) {
            System.out.println("Removal failed: " + e.getMessage());
        }

        System.out.println(flightService.getFlights());

        System.out.println("\n=== Duplicate flight check ===");

        try {
            flightService.addFlight(f4);
            System.out.println("FAIL: Duplicate flight was accepted.");
        } catch (DuplicateFlightException e) {
            System.out.println("PASS: " + e.getMessage());
        }

        System.out.println("\n=== Re-add removed flight ===");

        try {
            flightService.addFlight(f1);
            System.out.println("Flight re-added: TX23");
        } catch (IllegalArgumentException | DuplicateFlightException e) {
            System.out.println("Addition failed: " + e.getMessage());
        }

        System.out.println("\n=== Invalid flight checks ===");

        checkInvalidFlight(flightService, "Null flight", null);

        checkInvalidFlight(
                flightService,
                "Null flight number",
                new Flight(
                        null, "Istanbul", "Antalya", FlightStatus.SCHEDULED
                )
        );

        checkInvalidFlight(
                flightService,
                "Empty flight number",
                new Flight(
                        "", "Istanbul", "Antalya", FlightStatus.SCHEDULED
                )
        );

        checkInvalidFlight(
                flightService,
                "Blank flight number",
                new Flight(
                        "   ", "Istanbul", "Antalya", FlightStatus.SCHEDULED
                )
        );

        checkInvalidFlight(
                flightService,
                "Null origin",
                new Flight(
                        "TEST01", null, "Antalya", FlightStatus.SCHEDULED
                )
        );

        checkInvalidFlight(
                flightService,
                "Empty origin",
                new Flight(
                        "TEST02", "", "Antalya", FlightStatus.SCHEDULED
                )
        );

        checkInvalidFlight(
                flightService,
                "Blank origin",
                new Flight(
                        "TEST03", "   ", "Antalya", FlightStatus.SCHEDULED
                )
        );

        checkInvalidFlight(
                flightService,
                "Null destination",
                new Flight(
                        "TEST04", "Istanbul", null, FlightStatus.SCHEDULED
                )
        );

        checkInvalidFlight(
                flightService,
                "Empty destination",
                new Flight(
                        "TEST05", "Istanbul", "", FlightStatus.SCHEDULED
                )
        );

        checkInvalidFlight(
                flightService,
                "Blank destination",
                new Flight(
                        "TEST06", "Istanbul", "   ", FlightStatus.SCHEDULED
                )
        );

        checkInvalidFlight(
                flightService,
                "Null status",
                new Flight(
                        "TEST07", "Istanbul", "Antalya", null
                )
        );

        System.out.println("\n=== Final flight list ===");
        System.out.println(flightService.getFlights());

        System.out.println(
                "Flight count: " + flightService.getFlights().size()
        ); // Beklenen: 5

        System.out.println("\n=== Flights sorted by number ===");
        System.out.println(flightService.getFlightsSortedByNumber());
    }

    private static void checkInvalidFlight(
            FlightService flightService,
            String testName,
            Flight flight
    ) {
        int countBefore = flightService.getFlights().size();

        try {
            flightService.addFlight(flight);
            System.out.println(
                    "FAIL - " + testName + ": Invalid flight was accepted."
            );
        } catch (IllegalArgumentException e) {
            System.out.println(
                    "PASS - " + testName + ": " + e.getMessage()
            );
        }

        System.out.println(
                "Flight count unchanged: "
                        + (flightService.getFlights().size() == countBefore)
        );
    }
}