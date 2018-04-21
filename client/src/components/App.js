import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import OverallCard from './OverallCard/OverallCard';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {Grid, Row, Col} from 'react-bootstrap';
import logo from '../logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      text: ""
    }

    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange(event){
    if(event.target.value !== "" && !event.target.value.includes('@')){
      const newText = '@' + event.target.value
      this.setState({text: newText})
    }
    else{
      this.setState({text: event.target.value})
    }

  }

  onClick(event){
    this.setState({text: this.state.text})
    this.props.analyzeTweets(this.state.text);
  }

  render() {
    return (
      <Grid className='App' fluid={true}>
        <Row>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Twitter Sentiment Analyzer</h1>
          </header>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col sm={8} md={8} mdOffset={2} smOffset={2}>
            <TextField 
              id='twitter-handle-field' 
              placeholder='@YourTwitterHandle'
              style={{fontSize: '2em', padding: '10px', width:'100%'}} 
              value={this.state.text} 
              onChange={this.onChange}>
            </TextField>
          </Col>
        </Row>
        <Row>
          <Col md={4} mdOffset={4}>
            <RaisedButton primary={true} label='Analyze' fullWidth={true} onClick={this.onClick}/>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col sm={12} md={12}>
            {this.props.loading ? <FontAwesomeIcon icon="spinner" size='3x' spin/> : null} 
            {this.props.data ? <OverallCard twitterHandle={this.state.text} overallMood={this.props.data.overallMood}/> : null }
          </Col>
        </Row>
      </Grid>
    );
  }
}
function mapStateToProps(state){
  return {
    loading: state.sentiment.loading,
    data: state.sentiment.payload
  }
}
export default connect(mapStateToProps, actions)(App);
