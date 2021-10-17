import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import {getCelius, getDirection, getDateTime} from './Utils.js'
import { useState  } from "react";

import LoadFiveDaysWeather from "./LoadFiveDaysWeather.js";


const CityComponent = (props) => {
  const { weather, loadFiveWeather, cityFiveWeather } = props;
  const [Five_day_weather_visible, setFive_day_weather_visible] = useState(false)
  return (
    <div className="container">
      {weather ? (
        <>
      <Card className="m-2">
        <CardContent>
          <div className="d-flex justify-content-between">
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {weather.name}, {weather.sys.country}
            </Typography>  
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {getDateTime(weather.dt, "date")}
            </Typography>  
          </div>
        <div className="row">
          <div className=" col-sm-12 col-md-6">
            <div>
              <p className="text-center h4"> {getCelius(weather.main.temp)}°C </p>
              <p className="text-center"> Max {getCelius(weather.main.temp_max)}°C | Min {getCelius(weather.main.temp_min)}°C </p>
            </div>
            <div className="circle-bg-img d-flex justify-content-center ">
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            </div>
            <div className="text-center">
              <p className="h5"> {weather.weather[0].main} </p>
              <p className=""> {weather.weather[0].description} </p>
              <p className=""> Clouds {weather.clouds.all}% </p>
            </div>
          </div>
          <div className=" col-sm-12 col-md-6">
            <div className="fw-bold text-justify">
              <p> <span className="text-secondary"> Wind Speed </span> {weather.wind.speed} m/s </p>
              <p>  <span className="text-secondary"> Wind Direction</span> {getDirection(weather.wind.deg)} </p>
              <p> <span className="text-secondary"> Humidity</span> {weather.main.humidity}% </p>
              <p> <span className="text-secondary"> Sunrise</span> {getDateTime(weather.sys.sunrise)} </p>
              <p> <span className="text-secondary"> Sunset</span> {getDateTime(weather.sys.sunset)} </p>
            </div>
            <div className="d-flex justify-content-end">
              {cityFiveWeather ? (
                <div>
                  { Five_day_weather_visible ? <Button onClick={()=>{setFive_day_weather_visible(false)}} variant="outlined" >Show Less</Button>
                  :
                  <Button onClick={()=>{setFive_day_weather_visible(true)}} variant="outlined" >Show More</Button>}
                </div>
              ) : (
                <Button onClick={loadFiveWeather} variant="outlined"> Load Next 5 days </Button>
              ) }
            </div>
          </div>
        </div>
        </CardContent>
      </Card>
      {(cityFiveWeather && Five_day_weather_visible) ? (
        <LoadFiveDaysWeather weathers={cityFiveWeather ? cityFiveWeather.list : null} />
      ) : null}
      </>
      ) : ( <Alert severity="error">Location Not Found</Alert> )}
    </div>
  );
};

export default CityComponent;
