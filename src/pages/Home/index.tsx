import {
  Nav,
  WeatherCard,
  WeatherInfo,
  Dot,
} from './components';
import logoUrl from '@/assets/public/logo.png';
import { DotsInfo } from '@/constants';
import store from '@/store';
import styles from './index.module.css';
import { location } from '@/types';
import { useEffect } from 'react';

export default function Home() {
  const [locationState, locationAction] = store.useModel('location');
  const [weatherState, weatherAction] = store.useModel('weather');

  const getAddress = async (params: location) => {
    await locationAction.getLocationAddress({
      location: `${params.longitude},${params.latitude}`,
    })
  }

  const getLocation = async () => {
    let res;
    try {
      res = await locationAction.getLocationInfo();
    } catch (err) {
      res = locationState.location;
    }

    getAddress(res);
    return res;
  }

  const getWeather = async () => {
    const res = await getLocation();
    await weatherAction.getWeatherData({
      lat: res && res.latitude || 0,
      lon: res && res.longitude || 0,
      exclude: 'hourly,daily,minutely,alerts',
    });
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logoUrl} />
      {
        DotsInfo.map((dot, index) => (
          <Dot key={index} width={dot.width} styles={{
            position: 'absolute',
            top: dot.top || 'auto',
            bottom: dot.bottom || 'auto',
            left: dot.left || 'auto',
            right: dot.right || 'auto',
          }} />
        ))
      }
      <div className={styles.content}>
        <WeatherCard location={{
          ...locationState.location,
          ...(locationState.addressComponent || {}),
        }} weather={weatherState.weather} />
        <WeatherInfo weather={weatherState.weather} />
        <Nav />
      </div>
    </div>
  );
}
