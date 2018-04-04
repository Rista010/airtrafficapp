import React, { Component } from 'react';
import Flight from '../../components/Flight/Flight';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import classes from './FlightList.css';

class FlightList extends Component {
    state = {
        flights: [],
    }

    getFlights = (latitude, longitude) => {
        let flight = this.state.flights;
        axios.get(`https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${latitude}&lng=${longitude}&fDstL=0&fDstU=100`)
                    .then(res => {
                        flight = res.data.acList;
                        flight.sort((a,b) => b.Alt - a.Alt);
                        this.setState({flights: flight});
                    })
    }

    componentDidMount(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                this.getFlights(position.coords.latitude, position.coords.longitude);
            }, (err) => { alert(err); })
        } else {
            alert("Geolocation not supported!");
        };
    }

    openFlight = (id) => {
        const flight = this.state.flights.find(fl => fl.Id === id);
        console.log(flight);
        const queryParams = [];
        for(let i in flight){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(flight[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/flight',
            search: '?' + queryString
        });
    }

    render(){
        return(
            <Aux>
                <div className={classes.headerTitle}>Flight List</div>
                <div className={classes.FlightTitle}>
                    <p>
                        Direction
                    </p>
                    <p>
                        Flight No
                    </p>
                    <p>
                        Altitude(Desc)
                    </p>
                </div>
                {
                    this.state.flights.map(flight => (
                        <Flight onClick={this.openFlight} key={flight.Id} flights={flight}/>
                    ))
                }
            </Aux>
        );
    }
}

export default FlightList;