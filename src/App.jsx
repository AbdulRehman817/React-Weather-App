import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [cities, setCities] = useState([]);
  const city = useRef(null);
  const [weatherData, setWeatherdata] = useState(false);
  const [weatherArr, setWeatherArr] = useState([]);
  const countryCode = "pk";
  const unit = "metric";
  const appId = "f6a0f36fb383472394974653240409";
  // const [currCity,setcurrCity}=useState([])

  function manageWeatherIcon(weatherInfo) {
    if (weatherInfo.includes("rain")) {
      return <img src="rain.png"></img>;
    } else if (weatherInfo.includes("smoke")) {
      return <img src=" smoke.png"></img>;
    } else if (weatherInfo.includes("clouds")) {
      return <img src=" cloud.png"></img>;
    } else if (weatherInfo.includes("sunny")) {
      return <img src="clear.png"></img>;
    } else if (weatherInfo.includes("clear")) {
      return <img src="moon.png"></img>;
    } else {
      return <img src=" cloud.png"></img>;
    }
  }

  function getWeather(e) {
    e.preventDefault();
    const currCity = city.current.value;
    if (cities.includes(currCity)) {
      alert("city already search");
      return;
    }
    const windSpeedImage = document.querySelector("#windSpeedImage");
    const humidityImage = document.querySelector("#humidityImage");
    const tumPara = document.querySelector("#tumPara");
    const humPara = document.querySelector("#humPara");
    const temperature = document.querySelector(".temperature");
    const span = document.querySelector(".span");
    tumPara.style.display = "block";
    humPara.style.display = "block";
    windSpeedImage.style.display = "block";
    humidityImage.style.display = "block";
    temperature.style.display = "block";
    span.style.display = "block";
    cities.push(currCity);
    setCities([...cities]);
    fetch(
      ` https://api.weatherapi.com/v1/current.json?key=${appId}&q=${currCity}&aqi=yes`
    )
      .then((response) => response.json())
      .then((res) => {
        weatherArr.unshift(res.data);
        setWeatherArr([...weatherArr]);
        console.log(res);
        setWeatherdata({
          Temp: Math.round(res.current.temp_c),
          Description: res.current.condition.text,
          Humdidty: res.current.humidity,
          WindSpeed: res.current.wind_kph,
          Icon: res.current.condition.icon,
          Text: res.current.condition.text,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    city.current.value = "";
  }
  {
    return (
      <div className="container">
        <div className="h1">
          <h1>Weather App</h1>
        </div>

        <div className="search">
          <img
            src="./icon.png"
            alt="Search Icon"
            className="icon"
            onClick={getWeather}
          />
          <input
            ref={city}
            type="search"
            placeholder="Enter Location"
            className="locationinput"
          />
        </div>

        <div className="weather_box">
          <img src={weatherData.Icon} alt={weatherData.Text} />

          <div className="info_weather" style={{}}>
            <p className="temperature">
              {weatherData.Temp}
              <span className="span">°C</span>
            </p>
            <p className="description"> {weatherData.Description}</p>
          </div>
        </div>

        <div className="weather_details">
          <div className="humidity">
            <img
              src="./wave.png"
              alt="Humidity Icon"
              style={{ display: "none" }}
              id="humidityImage"
            />
            <div className="info-humidity">
              <span> {weatherData.Humdidty}</span>
              <div className="text">
                <p style={{ display: "none" }} id="tumPara">
                  Humidity
                </p>
              </div>
            </div>
          </div>

          <div className="wind_speed">
            <img
              src="./mist.png"
              alt="Wind Speed Icon"
              style={{ display: "none" }}
              id="windSpeedImage"
            />
            <div className="info-humidity" id="info-humidity">
              <span>{weatherData.WindSpeed}</span>
              <div className="text">
                <p style={{ display: "none" }} className="tum-p" id="humPara">
                  WindSpeed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;

// import React, { useState, useRef } from "react";

// const App = () => {
//   const [cities, setCities] = useState([]);
//   const city = useRef(null);
//   const [weatherData, setWeatherData] = useState(null);
//   const appId = "f6a0f36fb383472394974653240409";

//   const getWeather = (e) => {
//     e.preventDefault();
//     const currCity = city.current.value.trim();
//     if (!currCity || cities.includes(currCity)) {
//       alert("Please enter a valid city or city already searched.");
//       return;
//     }
//     cities.push(currCity);
//     setCities([...cities]);

//     fetch(
//       `https://api.weatherapi.com/v1/current.json?key=${appId}&q=${currCity}&aqi=yes`
//     )
//       .then((response) => response.json())
//       .then((res) => {
//         setWeatherData({
//           Temp: Math.round(res.current.temp_c),
//           Description: res.current.condition.text,
//           Humidity: res.current.humidity,
//           WindSpeed: res.current.wind_kph,
//           Icon: res.current.condition.icon,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//     city.current.value = "";
//   };

//   return (
//     <div className="container">
//       <h1>Weather App</h1>
//       <div className="input">
//         <div style={{ position: "relative" }}>
//           <img
//             src="./images/icon.png"
//             alt="Search Icon"
//             className="icon"
//             onClick={getWeather}
//           />
//           <input
//             ref={city}
//             type="search"
//             placeholder="Enter Location"
//             className="locationinput"
//           />
//         </div>
//       </div>

//       {weatherData && (
//         <>
//           <div className="weather_box">
//             <img src={weatherData.Icon} alt={weatherData.Description} />
//             <div className="info_weather">
//               <p className="temperature">{weatherData.Temp}°C</p>
//               <p className="description">{weatherData.Description}</p>
//             </div>
//           </div>

//           <div className="weather_details">
//             <div className="humidity">
//               <img src="./images/wave.png" alt="Humidity Icon" />
//               <div className="info-humidity">
//                 <span>{weatherData.Humidity}%</span>
//                 <div className="text">Humidity</div>
//               </div>
//             </div>

//             <div className="wind_speed">
//               <img src="./images/mist.png" alt="Wind Speed Icon" />
//               <div className="info_wind_speed">
//                 <span>{weatherData.WindSpeed} kph</span>
//                 <div className="text">Wind Speed</div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default App;
