import { request } from 'ice';
import { TIPS, GAODE_KEY, WEATHER_KEY } from '@/constants';
import { location, locationParams, weatherParams } from '@/types';

export default {
  /**
   * 获取定位
   */
  getLocation(): Promise<location> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (result) => {
            if (result && result.coords) {
              const locationInfo = {
                latitude: result.coords.latitude,
                longitude: result.coords.longitude,
              };
              resolve(locationInfo);
            }
          },
          (error) => {
            switch (error.code) {
              case 1:
                reject(TIPS.NO_PERMISSION);
                break;
              case 2:
                reject(TIPS.UNAVAILIABLE);
                break;
              case 3:
                reject(TIPS.TIMEOUT);
                break;
              default:
                reject(TIPS.UNKNOWN);
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 3000,
          },
        );
        return;
      }

      reject(TIPS.NO_LOCATION)
    })
  },

  /**
   * 根据经纬度获取城市信息
   */
  async getLocationRegeo(params: locationParams) {
    try {
      const result = await request({
        url: 'https://restapi.amap.com/v3/geocode/regeo',
        method: 'GET',
        params: {
          key: GAODE_KEY,
          location: params.location,
        }
      });
      if (result && result.regeocode) {
        return result.regeocode.addressComponent;
      }
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * 根据经纬度获取天气
   */
   async getWeather(params: weatherParams) {
    try {
      const result = await request({
        url: 'https://api.openweathermap.org/data/2.5/onecall',
        method: 'GET',
        params: {
          appid: WEATHER_KEY,
          lat: params.lat,
          lon: params.lon,
          exclude: params.exclude,
          units: 'metric',
          lang: 'zh_cn',
        }
      });
      return result;
    } catch (err) {
      console.error(err);
    }
  }
};
