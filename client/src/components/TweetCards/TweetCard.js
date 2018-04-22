import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Col} from 'react-bootstrap';

const TweetCard = (props) => {

    const renderCardContent = () =>{
        return(
            <div>
                <span className='card-content'>{props.text}</span>
            </div>
        )
    }

    return(
        <Col className='col' sm={12} md={4} style={{marginBottom: '10px', display: 'table-cell'}}>
            <Card>
                <CardHeader title={props.user.name} subtitle={'@' + props.user.handle} avatar={props.user.image} />
                <CardText style={{fontSize: '1.1em', fontWeight:'bold'}}>
                    {props.text}
                </CardText>
            </Card>
        </Col>
    )
}

export default TweetCard;