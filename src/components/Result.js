import React from "react";
import "./Result.css";
const Result = props => {
  const {
    err,
    date,
    city,
    sunrise,
    sunset,
    temp,
    pressure,
    wind
  } = props.weather;
  let content = null;
  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
    content = (
      <React.Fragment>
        <div>
          Wyszukiwanie dla <em>{city}</em>
        </div>
        <h4>Dane dla dnia i godziny: {date}</h4>
        <h4>Aktualna temperatura: {temp} &#176;C</h4>
        <h4>Wschód Słońca: {sunriseTime}</h4>
        <h4>Zachód Słońca: {sunsetTime}</h4>
        <h4>Aktualna siła wiatru: {wind}</h4>
        <h4>Aktualne ciśnienie: {pressure} hPa</h4>
      </React.Fragment>
    );
  }

  return (
    <div className="result">{err ? `Nie mamy w bazie ${city}` : content}</div>
  );
};

export default Result;
