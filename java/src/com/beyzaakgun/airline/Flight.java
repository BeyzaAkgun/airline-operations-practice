package com.beyzaakgun.airline;

public class Flight {
    private String flightNumber;
    private String origin;
    private String destination;
    private FlightStatus status;


    public Flight(String flightNumber, String origin, String destination, FlightStatus status){
        this.status=status;
        this.destination=destination;
        this.origin=origin;
        this.flightNumber=flightNumber;

    }

    public FlightStatus getStatus(){
        return this.status;
    }
    public void setStatus(FlightStatus status){
        this.status=status;
        //Coming one also should be FlightStatus object
    }
    public String getDestination(){
        return this.destination;
    }
    public void setDestination(String destination){
        this.destination=destination;
    }
    public String getOrigin(){
        return this.origin;
    }
    public void setOrigin(String origin){
        this.origin=origin;
    }
    public String getFlightNumber(){
        return this.flightNumber;
    }
    public void setFlightNumber(String number){
        this.flightNumber=number;
    }

    @Override
    public String toString(){
        return "Flight " + flightNumber + " from " + origin + " to " + destination
                + ". Its current status is " + status;
    }

    }



