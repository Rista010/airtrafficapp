import React from 'react';
import Wrapper from './Wrapper';
import classes from './Layout.css';

const layout = (props) => (
    <Wrapper>
        <div className={classes.header}>Air Traffic App</div>
        <main className={classes.Layout}>
            {props.children}
        </main>
    </Wrapper>
);

export default layout;