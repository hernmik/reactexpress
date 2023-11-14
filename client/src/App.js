import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/get_prices');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <div className="App-intro">
        <h1><strong>Hourly Electricity Prices</strong></h1>
          {this.state.data && (
            <Table striped bordered hover className="table-dark">
              
              <thead>
                <tr>
                  <th>Start Date and Hour</th>
                  
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.prices.map((item, index) => (
                  <tr key={index}>
                    <td>{`${new Date(item.startDate).toLocaleDateString()} ${new Date(item.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(item.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</td>
                
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    );
  }
  
  
}

export default App;
