import React, { Component } from "react";
import Form from "./Form";
import Result from "./Result";
import "./App.css";
const APIKey = "df71882dbde2adeffa6abc04a319bbbb";
class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: "",
  };
  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.value);
    // console.log(this.state.value);
    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric
    `;

      fetch(API)
        .then((response) => {
          if (response.ok) {
            // console.log(response.status);
            return response;
          }
          throw Error("Nie udało się");
        })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const time = new Date().toLocaleString();
          this.setState((prevState) => ({
            err: false,
            date: time,
            city: prevState.value,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed,
          }));
        })
        .catch((err) => {
          console.log(err);
          this.setState((state) => {
            return {
              err: true,
              city: state.value,
            };
          });
        });
    }
  }
  render() {
    return (
      <div className="App">
        <Form text={this.state.value} change={this.handleInputChange} />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
