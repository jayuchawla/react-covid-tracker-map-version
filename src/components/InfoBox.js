import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react'

import '../styles/infobox.css';

/////// waht is props ??? to handle onClick!!! AMAZING!!!
function InfoBox({ title, cases, total, identifierColor, active, ...props}) {
    return (
        <Card className="infoBox" onClick={props.onClick}>
            {
                active ? <div style={{border: `1px solid ${identifierColor}`}}></div> : null
            }  
            <CardContent>
                <Typography className="infoBox__title">
                    {title}
                </Typography>
                <div style={{height:"10px", backgroundColor:`${identifierColor}`}}></div>
                <h2 className="infoBox__cases" style={{color:`${identifierColor}`}}>{cases}</h2>
                <Typography className="infoBox__total" >
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
