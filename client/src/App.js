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
          {this.state.data && 
            <table>
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.prices.map((item, index) => (
                  <tr key={index}>
                    <td>{new Date(item.startDate).toLocaleString()}</td>
                    <td>{new Date(item.endDate).toLocaleString()}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
    );
  }
  
  
}

export default App;
