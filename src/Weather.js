import React,{useState, useEffect} from 'react'


const API_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const ICON_URL = 'http://openweathermap.org/img/wn/';
const API_KEY = '';


export default function Weather({lat,lng}) {
    const [temp, setTemp] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [direction, setDirection] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
      const url = API_URL +
      'lat=' + lat +
      '&lon=' + lng +
      '&units=metric' +
      '&appid=' + API_KEY;
  
      fetch(url)  
      .then(res => res.json())
      .then (
        (result) => {
          if (result.current !== undefined) {
            setTemp(result.current.temp);
            setSpeed(result.current.wind_speed);
            setDirection(result.current.wind_deg);
            setDescription(result.current.weather[0].description);
            setIcon(ICON_URL + result.current.weather[0].icon + '@2x.png');
          }
          else {
            alert('Could not read weather information!')
          }
        }, (error) => {
          alert(error);
        }
      )
    }, [])

    return (
        <>
        <h3>Weather on your location</h3>
        <p>{temp} C&#176;</p>
        <p>{speed} m/s {direction} degrees </p>
        <p>{description}</p>
        <img src={icon} alt=""/>
    
        </>
      )
}

