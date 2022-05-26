import homeUrl from '@/assets/public/home.png';
import rainUrl from '@/assets/public/rain-w.png';
import humidityUrl from '@/assets/public/humidity-w.png';
import windUrl from '@/assets/public/wind-w.png';
import rainBUrl from '@/assets/public/rain-b.png';
import humidityBUrl from '@/assets/public/humidity-b.png';
import windBUrl from '@/assets/public/wind-b.png';
import dayClounds from '@/assets/weather/clouds-day.png';
import nightClounds from '@/assets/weather/clouds-night.png';
import dayRain from '@/assets/weather/rain-day.png';
import nightRain from '@/assets/weather/rain-night.png';
import daySnow from '@/assets/weather/snow-day.png';
import nightSnow from '@/assets/weather/snow-night.png';
import dayStorm from '@/assets/weather/storm-day.png';
import nightStorm from '@/assets/weather/storm-night.png';
import dayWind from '@/assets/weather/wind-day.png';
import nightWind from '@/assets/weather/wind-night.png';
import daySun from '@/assets/weather/sun-day.png';
import nightMoon from '@/assets/weather/moon-night.png';
import moment from 'moment';

interface DotProp {
  width?: number;
  color?: string;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}

interface NavProp {
  id: number;
  title?: string;
  icon?: string;
  url?: string;
}

interface InfoProp {
  title: string;
  icon?: string;
  iconB?: string;
  value: string;
  style?: any;
  suffix?: string;
}

const DotsInfo: DotProp[] = [
  {
    width: 5,
    top: 32,
    right: '37.3%'
  },
  {
    width: 8,
    top: 10,
    right: '20%'
  },
  {
    width: 11,
    bottom: '14.5%',
    left: 27
  },
  {
    width: 4,
    bottom: '20%',
    left: 57
  },
  {
    width: 5,
    bottom: '12.6%',
    left: 94
  },
];

const Navs: NavProp[] = [
  {
    id: 1,
    title: 'Home',
    icon: homeUrl,
  }
];

const Infos: InfoProp[] = [
  {
    title: '降水量',
    icon: rainUrl,
    iconB: rainBUrl,
    value: 'rain',
    suffix: '%',
    style: {
      backgroundColor: 'rgba(101, 142, 217, 0.1)',
      padding: '0 15px',
      color: '#658ED9',
    }
  },
  {
    title: '湿度',
    icon: humidityUrl,
    iconB: humidityBUrl,
    value: 'humidity',
    suffix: '%',
    style: {
      backgroundColor: 'rgba(216, 97, 145, 0.1)',
      padding: '0 12px',
      color: '#D86191',
    },
  },
  {
    title: '风速',
    icon: windUrl,
    iconB: windBUrl,
    value: 'wind',
    suffix: 'km/h',
    style: {
      backgroundColor: 'rgba(94, 79, 193, 0.1)',
      padding: '0 10.5px',
      color: '#5E4FC1',
    },
  }
];

const isNight = moment().hour() > 18 || moment().hour() < 6;
const WeathersStatus = {
  Clear: isNight ? nightMoon : daySun,
  Clouds: isNight ? nightClounds : dayClounds,
  Atmosphere: isNight ? nightWind : dayWind,
  Rain: isNight ? nightRain : dayRain,
  Snow: isNight ? nightSnow : daySnow,
  Thunderstorm: isNight ? nightStorm : dayStorm,
};

const TIPS = {
  NO_LOCATION: '不支持定位功能',
  NO_PERMISSION: '暂无位置信息服务权限',
  UNAVAILIABLE: '位置信息不可用',
  TIMEOUT: '请求位置信息超时',
  UNKNOWN: '未知错误',
};

const GAODE_KEY = '2051ae217b9ccf12766ce915a8b83dba';
const WEATHER_KEY = 'f76b1064c9ad61102446d5bfae54f1f2';

export {
  DotsInfo,
  Navs,
  Infos,
  WeathersStatus,
  TIPS,
  GAODE_KEY,
  WEATHER_KEY,
};
