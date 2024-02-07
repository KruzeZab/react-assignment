import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchWeather,
  selectWeatherData,
  selectWeatherError,
  selectWeatherStatus,
} from '../../features/weatherSlice';

const Weather = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectWeatherData);
  const status = useAppSelector(selectWeatherStatus);
  const error = useAppSelector(selectWeatherError);

  useEffect(() => {
    dispatch(fetchWeather());
  }, []);

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'rejected') {
    return <p>{error}</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {data && (
        <>
          <p>
            Apparent Temperature: {data.apparent_temperature}
            <sup>o</sup>C
          </p>
          <p>Is Day: {data.is_day ? 'Yes' : 'No'}</p>
          <p>Rain: {data.rain ? 'Yes' : 'No'}</p>
          <p>Relative Humidity: {data.relative_humidity_2m}</p>
          <p>Showers: {data.showers ? 'Yes' : 'No'}</p>
          <p>Snowfall: {data.snowfall ? 'Yes' : 'No'}</p>
          <p>Temperature 2m: {data.temperature_2m}</p>
          <p>Time: {data.time}</p>
          <p>Wind direction: {data.wind_direction_10m}</p>
          <p>Wind speed: {data.wind_speed_10m} kmph</p>
        </>
      )}
    </div>
  );
};

export default Weather;
