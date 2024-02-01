import { useEffect, useState } from 'react';

interface IWeatherData {
  apparent_temperature: number;
  interval: number;
  is_day: number;
  rain: number;
  relative_humidity_2m: number;
  showers: number;
  snowfall: number;
  temperature_2m: number;
  time: string;
  wind_direction_10m: number;
  wind_speed_10m: number;
}

interface IWeatherFetchResult {
  data: IWeatherData | null;
  loading: boolean;
  error: string | null;
}

const useWeather = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=27.673&longitude=85.43&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,showers,snowfall,wind_speed_10m,wind_direction_10m',
      );

      const data = await response.json();
      setWeatherData(data.current);
      console.log(data);
    } catch (error) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return { data: weatherData, loading, error } as IWeatherFetchResult;
};

export default useWeather;
