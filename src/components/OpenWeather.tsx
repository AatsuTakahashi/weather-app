import axios from 'axios';
import { useState } from 'react';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

interface WeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
}

function OpenWeather() {
  const [city, setCity] = useState('Tokyo');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ja`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('データ取得エラー:', error);
    }
  };

  return (
    <>
      <input
        type='text'
        placeholder='地域名を入力'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>天気取得</button>
      {weatherData && (
        <div>
          <h2>{city}のお天気</h2>
          <p>
            <img
              src={
                'http://openweathermap.org/img/w/' +
                weatherData.weather[0].icon +
                '.png'
              }
            />
          </p>
          <p>天気: {weatherData.weather[0].description}</p>
          <p>気温: {weatherData.main.temp}°C</p>
        </div>
      )}
    </>
  );
}

export default OpenWeather;
