import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react'

class App extends Component {
  state = {
    weatherforecast:[]
  }

  componentDidMount(){
    axios.get('https://localhost:5001/weatherforecast')
     .then((response)=>{
       this.setState({
        weatherforecast: response.data
      })
     })
    
  }
  render(){
    return (
      <div >
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>SmartActivities</Header.Content>
        </Header>
        <List>
        {this.state.weatherforecast.map((weatherforecast:any)=>(
             // <li key={weatherforecast.date}>{weatherforecast.summary}</li>  
              <List.Item key={weatherforecast.date}>{weatherforecast.summary}</List.Item>
            ))}
        </List>  
          <ul> 
            
          </ul>
        
      </div>
    );
  }
  
}

export default App;
