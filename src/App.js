import { useState, useEffect } from "react";
import axios from 'axios'

import './custom.css'

import CityComponent from "./Components/CityComponent.js";
import WeatherComponent from './Components/WeatherInfo.js'
import NavBar from "./Components/NavBar";

const API_KEY = '64b61b145f3d04e6d87ec82a9116dba3'

function App() {

  const [city, setCity] = useState();
  const [weather, setWeather] = useState();
  const [notFound, setNotFound] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [cityWeather, setCityWeather] = useState(null)
  const [cityFiveWeather, setCityFiveWeather] = useState(null)

  useEffect( ()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      setCurrentLocation(position.coords)
    });
  })

  const getWeatherByCity = async (e) => {
    e.preventDefault()
    let response = null
    try {
      response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      setCityWeather(response.data)
      setCityFiveWeather(null)
      setNotFound(false)
    }catch(err){
      setCityFiveWeather(null)
      setCityWeather(null)
      setNotFound(true)
    }finally{

    }
  }
  const loadFiveWeather = async (e) => {
    e.preventDefault()
    let response = null
    try {
      response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
      setCityFiveWeather(response.data)
      setNotFound(false)
    }catch(err){
      setCityFiveWeather(null)
      setNotFound(true)
    }finally{

    }
  }

  const getWeatherByCurrentLocation = async (e) => {
    e.preventDefault()
    let response = null
    try {
      response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${API_KEY}`)
      setWeather(response.data)
      setCityWeather(null)
      setNotFound(false)
    }catch(err){
      setWeather(null)
      setNotFound(true)
    }finally{

    }
  }

  return (
    <>
      <NavBar  getWeatherByCurrentLocation={getWeatherByCurrentLocation} setCity={setCity} getWeatherByCity={getWeatherByCity}  />
      {cityWeather || notFound ? (
        <CityComponent notFound={notFound} weather={cityWeather} loadFiveWeather={loadFiveWeather} cityFiveWeather={cityFiveWeather} />
        ): (
        <WeatherComponent weather={weather} dailyweather={weather ? weather.daily : null}  />
      ) }
    </>
    );
  }
  
  export default App;
  
  // <>
  //   {notFound ? (
  //     <div class="container">
  //       <Alert severity="error">City Not Found </Alert>
  //     </div>
  //     ) : null }
  // <Container sx={{ marginTop: 10 }}>
  //   <Grid container spacing={2}>
  //     <Grid md={6} xs={12}>
  //       <Card sx={{ margin: 1,height: 400 }}>
  //         <CardContent>
  //           <CityComponent updateCity={setCity} city={city} getWeather={getWeatherByCity} getWeatherByCurrentLocation={getWeatherByCurrentLocation} />
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //     {(weather && !notFound) ? (
  //     <Grid md={6} xs={12} className="container" >
  //       <Card sx={{ margin: 1, height: 400 }}>
  //         <CardContent>
  //           <WeatherComponent weather={weather} notFound={notFound} city={city} />
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //     ) : null}
  //   </Grid>
      
  // </Container>
  // </>