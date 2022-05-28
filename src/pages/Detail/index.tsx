import { history, useLocation } from 'umi';
import TodayWeather from './components/weather-today';
import Chart from './components/chart';
import HoursTemp from './components/hours-temp';
import WeekTemp from './components/week-temp';
import backUrl from '@/assets/public/back.png';
import styles from './index.module.css';
import useService from '@/services';
import type { Location } from 'umi';
import { useEffect, useState } from 'react';
import { location } from '@/types';
import moment from 'moment';
import { getCurrentDay } from '@/utils';
import { WeathersStatus } from '@/constants';

export default function Detail() {
  const location = useLocation() as Location & {
    query: location;
  };
  const { latitude, longitude, city, province } = location.query;

  const [weatherState, weatherAction] = useState({
    weather: {
      temp: 0,
      humidity: 0,
      wind: 0,
      rain: 0,
      main: '',
      mainList: [],
      daily: [],
      hourly: [],
    },
  });

  const getWeather = async () => {
    const data = await useService.getWeather({
      lat: Number(latitude) || 0,
      lon: Number(longitude) || 0,
      exclude: 'minutely',
    });
    weatherAction({
      ...weatherState,
      weather: {
        temp: data.current.temp.toFixed(0),
        humidity: data.current.humidity,
        wind: data.current.wind_speed,
        rain: data.current.rain ? data.current.rain['1h'] : 0,
        main: data.current.weather[0].main,
        mainList: data.current.weather[0].description.split('，'),
        daily:
          data.daily &&
          data.daily.slice(0, 7).map((item: any) => ({
            id: item.dt,
            week: getCurrentDay(moment.unix(item.dt).day()),
            icon:
              item.weather &&
              item.weather[0] &&
              item.weather[0].main &&
              WeathersStatus[item.weather[0].main],
            tempHigh: item.temp && item.temp.max && item.temp.max.toFixed(0),
            tempLow: item.temp && item.temp.min && item.temp.min.toFixed(0),
          })),
        hourly:
          data.hourly &&
          data.hourly.slice(0, 24).map((item: any) => ({
            id: item.dt,
            temp: item.temp.toFixed(0),
            time: moment.unix(item.dt).format('H a'),
          })),
      },
    });
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className={styles.detail}>
      <img
        className={styles.img}
        src={backUrl}
        onClick={() => {
          history?.push('/');
        }}
      />
      <TodayWeather weather={weatherState.weather} location={location.query} />
      <Chart hourList={weatherState.weather.hourly} />
      <HoursTemp hourList={weatherState.weather.hourly} />
      <WeekTemp weekList={weatherState.weather.daily} />
    </div>
  );
}
