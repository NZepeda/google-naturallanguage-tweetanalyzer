import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {Grid, Row, Col} from 'react-bootstrap'
import logo from '../logo.svg';
import './App.css'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      text: "",
      loading: false
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
    this.setState({text: this.state.text, loading: true})
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
            <TextField id='twitter-handle-field' placeholder='@YourTwitterHandle' style={{fontSize: '2em', padding: '10px', width:'100%'}} value={this.state.text} onChange={this.onChange}></TextField>
          </Col>
        </Row>
        <Row>
          <Col md={4} mdOffset={4}>
            <RaisedButton primary={true} label='Analyze' fullWidth={true} onClick={this.onClick}/>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col sm={12} md={12}>
            {this.state.loading ? <FontAwesomeIcon icon="spinner" size='3x' spin/> : null} 
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(App);
