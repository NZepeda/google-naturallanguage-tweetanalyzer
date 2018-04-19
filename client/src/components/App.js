import React, { Component } from 'react';
import TextField from 'material-ui/TextField' 
import {Grid, Row, Col} from 'react-bootstrap'
import logo from '../logo.svg';
import './App.css'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      text: ""
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(event){
    console.log(event)
    if(event.target.value !== "" && !event.target.value.includes('@')){
      const newText = '@' + event.target.value
      this.setState({text: newText})
    }
    else{
      this.setState({text: event.target.value})
    }

  }

  render() {
    return (
      <Grid className='App'>
        <Row>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Twitter Sentiment Analyzer</h1>
          </header>
        </Row>
        <Row>
          <Col sm={12} md={8} mdOffset={2}>
            <TextField id='twitter-handle-field' placeholder='@YourTwitterHandle' fullWidth={true} style={{fontSize: '2em', padding: '10px'}} value={this.state.text} onChange={this.onChange}></TextField>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
