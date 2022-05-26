import useService from '@/services';
import moment from 'moment';
import { getCurrentDay } from '@/utils';
import { WeathersStatus } from '@/constants';

export default {
  state: {
    weather: {
      temp: 0,
      humidity: 0,
      wind: 0,
      rain: 0,
      main: '',
      mainList: [],
      daily: [],
      hourly: [],
    }
  },

  reducers: {
    update(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    }
  },

  effects: (dispatch) => ({
    async getWeatherData(params) {
      const data = await useService.getWeather(params);
      dispatch.weather.update({
        weather: {
          temp: data.current.temp.toFixed(0),
          humidity: data.current.humidity,
          wind: data.current.wind_speed,
          rain: data.current.rain ? data.current.rain['1h'] : 0,
          main: data.current.weather[0].main,
          mainList: data.current.weather[0].description.split('，'),
          daily: data.daily && data.daily.slice(0, 7).map(item => ({
            id: item.dt,
            week: getCurrentDay(moment.unix(item.dt).day()),
            icon: item.weather && item.weather[0] && WeathersStatus[item.weather[0].main],
            tempHigh: item.temp && item.temp.max && item.temp.max.toFixed(0),
            tempLow: item.temp && item.temp.min && item.temp.min.toFixed(0),
          })),
          hourly: data.hourly && data.hourly.slice(0, 24).map(item => ({
            id: item.dt,
            temp: item.temp.toFixed(0),
            time: moment.unix(item.dt).format('H a')
          })),
        }
      });
      return data;
    }
  })
};
