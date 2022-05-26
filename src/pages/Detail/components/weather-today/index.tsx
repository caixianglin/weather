import { WeathersStatus, Infos } from '@/constants';
import styles from './index.module.css';

interface TodayProp {
  weather: any;
  location: any;
}

export default function Today(props: TodayProp) {
  const { weather, location } = props;

  return (
    <div className={styles.today}>
      <img className={styles.img} src={WeathersStatus[weather?.main]} />
      <div className={styles.address}>{location && location.city && location.city.length !== 0 ? `${location.city},` : ''}<br />{location?.province}</div>
      <div className={styles.temp}>{weather.temp}<i>℃</i></div>
      <ul>
        {
          Infos.map(info => (
            <li className={styles.item} key={info.value} style={info.style}>
                <img src={info.iconB} />
                <span className={styles.value}>{weather[info.value]}{info.suffix}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}