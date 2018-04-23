import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Card} from 'material-ui/Card';
import SentimentPieChart from '../PieChart/SentimentPieChart';

class OverallCard extends Component{
    renderContent(){
        return (
            <div>
                <h2>{this.props.twitterHandle + "'s overall mood is: "}</h2>
                <h1>{this.props.overallMood}</h1>
                <Row>
                    <Col sm={12} md={12}>
                        <SentimentPieChart data={this.props.buckets} />
                    </Col> 
                </Row>
            </div>
        )
    }
    render(){
        return(
            <Row>
                <Col sm={12} md={10} mdOffset={1}>
                    <Card children={this.renderContent()}>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default OverallCard;