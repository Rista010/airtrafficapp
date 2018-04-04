import React, { Component } from 'react';
import Aux from '../../Aux';
import axios from 'axios';
import classes from './FlightPage.css';

class FlightPage extends Component {
    state = {
        flights: { },
        logoObj: "",
    }

    getLogo = (company) => {
        axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`)
            .then(res => {
                this.setState({ logoObj: res.data[0].logo });
                console.log(this.state.logoObj);
            })
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const flight = {};
        for (let param of query.entries()) {
            flight[param[0]] = param[1];
        }
        this.setState({ flights: flight });
    }
    
    

    render(){
        this.getLogo(this.state.flights.Op);
        return(
            <Aux>
                <div className={classes.headerTitle}>Flight Page</div>
                <div>
                    <div className={classes.logo}>
                        <img src={this.state.logoObj} alt=""/>
                    </div>
                    <div className={classes.field}><span>Manufacturer:</span> {this.state.flights.Man}</div>
                    <div className={classes.field}><span>Model:</span> {this.state.flights.Mdl}</div>
                    <div className={classes.field}><span>Origin:</span> {this.state.flights.From}</div>
                    <div className={classes.field}><span>Destination:</span> {this.state.flights.To}</div>
                </div>
            </Aux>
        );
    }
}

export default FlightPage;