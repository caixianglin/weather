import { history, getSearchParams } from 'ice';
import TodayWeather from './components/weather-today';
import Chart from './components/chart';
import HoursTemp from './components/hours-temp';
import WeekTemp from './components/week-temp';
import backUrl from '@/assets/public/back.png';
import styles from './index.module.css';
import store from '@/store';
import { useEffect } from 'react';

export default function Detail() {
  const { latitude, longitude } = getSearchParams();
  const [weatherState, weatherAction] = store.useModel('weather');
  const [locationState, actions] = store.useModel('location');

  const getWeather = async () => {
    await weatherAction.getWeatherData({
      lat: Number(latitude) || 0,
      lon: Number(longitude) || 0,
      exclude: 'minutely',
    });
  }

  useEffect(() => {
    getWeather();
  }, []);
console.log(1, weatherState.weather)
  return (
    <div className={styles.detail}>
      <img className={styles.img} src={backUrl} onClick={() => {
        history?.replace('/');
      }} />
      <TodayWeather weather={weatherState.weather} location={locationState.addressComponent} />
      <Chart hourList={weatherState.weather.hourly} />
      <HoursTemp hourList={weatherState.weather.hourly} />
      <WeekTemp weekList={weatherState.weather.daily} />
    </div>
  );
}