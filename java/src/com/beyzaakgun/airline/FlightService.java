package com.beyzaakgun.airline;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.*;
import java.util.Comparator;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;


public class FlightService {
    private final List<Flight> flights;

    public FlightService(){
        this.flights=new ArrayList<>();

    }
    public List<Flight> getFlights(){
        return List.copyOf(flights);
    }
//    public void setFlights(List<Flight> newFlights){
//        this.flights=newFlights;
//    }

    public void addFlight(Flight flight){
        if(flight==null){
            throw new IllegalArgumentException("Flight can not be null.");
        }
        String flightNum=flight.getFlightNumber();
        if (flightNum == null || flightNum.isBlank()) {
            throw new IllegalArgumentException("Flight number can not be null or blank.");
        }
        if(flight.getOrigin()==null || flight.getOrigin().isBlank()){
            throw new IllegalArgumentException("Flight origin can not be null or blank.");
        }
        if(flight.getDestination()==null || flight.getDestination().isBlank()){
            throw new IllegalArgumentException("Flight destination can not be null or blank.");
        }
        if(flight.getStatus()==null){
            throw new IllegalArgumentException("Flight status can not be null.");
        }

        for(Flight existingFlight:flights){
            if(existingFlight.getFlightNumber().equals(flightNum)){
                throw new DuplicateFlightException("Flight already exists: " + flightNum);
            }

        }
        flights.add(flight);


    }

    public Flight findFlightByNumber(String flightNumber) {
        for(Flight flight:flights){
            String flightNum=flight.getFlightNumber();
            if(flightNum.equals(flightNumber)){
                return flight;
            }
        }
        return null;

    }

    public List<Flight> findFlightsByStatus(FlightStatus status){
        return flights.stream()
                .filter(flight->flight.getStatus()==status)
                .toList();
    }

    public void updateFlightStatus(String flightNum,FlightStatus newStatus) {
        if(flightNum==null || flightNum.isBlank()){
            throw new IllegalArgumentException("Flight number can not be null or blank.");
        }
        if(newStatus==null){
            throw new IllegalArgumentException("Flight status can not be null.");
        }
            Flight flight = findFlightByNumber(flightNum);
            if(flight==null) {
                throw new FlightNotFoundException("Flight can not be found. "+ flightNum);
            }
            flight.setStatus(newStatus);


    }

    public void removeFlight(String flightNumber){
        if(flightNumber==null || flightNumber.isBlank()){
            throw new IllegalArgumentException("Flight number can not be null or blank.");
        }
        Flight flight=findFlightByNumber(flightNumber);
        if(flight==null){
            throw new FlightNotFoundException("Flight can not be found. "+ flightNumber);
        }
       flights.remove(flight);
    }

    public List<Flight> getFlightsSortedByNumber() {
        return flights.stream()
                .sorted(Comparator.comparing(flight -> flight.getFlightNumber()))
                .toList();
    }
    public Map<FlightStatus, Integer> getFlightCountByStatus() {
        Map<FlightStatus, Integer> counts = new HashMap<>();

        for (Flight flight : flights) {
            FlightStatus status = flight.getStatus();

            int currentCount = counts.getOrDefault(status, 0);
            counts.put(status, currentCount + 1);
        }

        return counts;
    }

//    public Optional<Flight> findOptionalFlightByNumber(String flightNumber){
//       return flights.stream()
//               .filter(flight->flight.getFlightNumber().equals(flightNumber))
//               .findFirst();
//
//    }

}
