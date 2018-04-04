import React from 'react';
import classes from './Flight.css';
import planeLogo from '../../images/plane.png';

const flight = (props) => {
    return (
        <div onClick={() => props.onClick(props.flights.Id)} className={classes.Flight}>
            <p>
                {props.flights.Trak < 180 ? <img src={planeLogo} alt="" className={classes.East}/> : <img src={planeLogo} alt="" className={classes.West}/>}
            </p>
            <p>
                {props.flights.Icao}
            </p>
            <p>
                {props.flights.Alt}
            </p>
        </div>
    );
}

export default flight;