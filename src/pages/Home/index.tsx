import { Nav, WeatherCard, WeatherInfo, Dot } from './components';
import logoUrl from '@/assets/public/logo.png';
import { DotsInfo } from '@/constants';
import useService from '@/services';
import styles from './index.module.css';
import { location } from '@/types';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getCurrentDay } from '@/utils';
import { WeathersStatus } from '@/constants';

export default function Home() {
  const [locationState, locationAction] = useState({
    location: {
      latitude: 0,
      longitude: 0,
    },
    addressComponent: {
      city: '杭州市',
      province: '浙江省',
    },
  });
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

  const getAddress = async (params: location) => {
    const data = await useService.getLocationRegeo({
      location: `${params?.longitude || 0},${params?.latitude || 0}`,
    });
    if (data && data.city && data.city.length) {
      locationAction({
        ...locationState,
        location: params || {},
        addressComponent: data,
      });
    } else {
      locationAction({
        ...locationState,
        location: params || {},
      });
    }
  };

  const getLocation = async () => {
    let data;
    try {
      data = await useService.getLocation();
    } catch {
      data = locationState.location;
    }

    getAddress(data);
    return data;
  };

  const getWeather = async () => {
    console.log(1);
    const res = await getLocation();
    console.log(2, res);
    const data = await useService.getWeather({
      lat: (res && res.latitude) || 0,
      lon: (res && res.longitude) || 0,
      exclude: 'hourly,daily,minutely,alerts',
    });
    console.log(3, data);
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
    <div className={styles.container}>
      <img className={styles.logo} src={logoUrl} />
      {DotsInfo.map((dot, index) => (
        <Dot
          key={index}
          width={dot.width}
          styles={{
            position: 'absolute',
            top: dot.top || 'auto',
            bottom: dot.bottom || 'auto',
            left: dot.left || 'auto',
            right: dot.right || 'auto',
          }}
        />
      ))}
      <div className={styles.content}>
        <WeatherCard
          location={{
            ...locationState.location,
            ...(locationState.addressComponent || {}),
          }}
          weather={weatherState.weather}
        />
        <WeatherInfo weather={weatherState.weather} />
        <Nav />
      </div>
    </div>
  );
}
