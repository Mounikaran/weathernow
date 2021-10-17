// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {getCelius, getDirection, getDateTime} from './Utils.js'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};


const WeatherComponent = (props) => {
  const { weather,  dailyweather} = props;
  
  return (
      <>
    <div className="container">
      {weather ? (
      <Card className="m-2">
        <CardContent>
          <div className="d-flex justify-content-between">
             
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {getDateTime(weather.current.dt, "full_date")}
            </Typography>  
          </div>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div>
              <p className="text-center h4"> {getCelius(weather.current.temp)}°C </p>
            </div>
            <div className="circle-bg-img d-flex justify-content-center ">
              <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt="" />
            </div>
            <div className="text-center">
              <p className="h5"> {weather.current.weather[0].main} </p>
              <p className=""> Clouds {weather.current.clouds}% </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="fw-bold text-justify">
              <p> <span className="text-secondary"> Wind Speed </span> {weather.current.wind_speed} m/s </p>
              <p>  <span className="text-secondary"> Wind Direction</span> {getDirection(weather.current.wind_deg)} </p>
              <p> <span className="text-secondary"> Humidity</span> {weather.current.humidity}% </p>
              <p> <span className="text-secondary"> Sunrise</span> {getDateTime(weather.current.sunrise)} </p>
              <p> <span className="text-secondary"> Sunset</span> {getDateTime(weather.current.sunset)} </p>
            </div>
          </div>
        </div>
        </CardContent>
      </Card>
      ) : null}
    </div>
    {dailyweather ? (
      
      <Carousel className="p-1"
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {dailyweather.map((key, index) => (
          <div key={index} className="container">
            <Card>
              <CardContent>
                <div className="d-flex justify-content-between">
                  
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Min {getCelius(key.temp.min)}°C
                  </Typography>
                  
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Max {getCelius(key.temp.max)}°C
                  </Typography>
                </div>
              <div className="d-flex justify-content-center">
                <div className="circle-bg-img-small">
                  <img src={`http://openweathermap.org/img/wn/${key.weather[0].icon}@2x.png`} alt="{}" />
                </div>
              </div>
                <p className="text-center">{key.weather[0].description}</p>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {getDateTime(key.dt, "date")}
                  </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Carousel>
    ) : null}
      </>
  );
};

export default WeatherComponent;
