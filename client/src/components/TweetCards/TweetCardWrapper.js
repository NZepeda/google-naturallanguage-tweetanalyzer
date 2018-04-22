import React, {Component} from 'react';
import {Card} from 'material-ui/Card';
import {Row} from 'react-bootstrap';
import Equalizer from 'react-equalizer';
import TweetCard from './TweetCard';
import './TweetCardWrapper.css';

class TweetCardWrapper extends Component {
    constructor(props){
        super(props);
    }
    renderContent(){
        return this.props.tweetSentiments.map((tweet, index) => {return (<TweetCard key={index} text={tweet[0].sentences[0].text.content} user={this.props.user}/>)});
    }
    render(){
        return(
            <Row className='col-container' style={{marginTop: '10px', display: 'table', width: '100%'}}>
                <Equalizer>
                    {this.renderContent()}
                </Equalizer>
            </Row>
        );
    }
}

export default TweetCardWrapper;