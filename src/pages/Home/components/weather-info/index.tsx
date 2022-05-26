import { Infos } from '@/constants';
import styles from './index.module.css';

interface WeatherProp {
    weather: any;
}

export default function WeatherInfo(props: WeatherProp) {
    const { weather = {} } = props;

    return (
        <ul className={styles.info}>
            {
                Infos.map(info => (
                    <li className={styles.item} key={info.value}>
                        <img src={info.icon} />
                        <span className={styles.title}>{info.title}</span>
                        <span className={styles.value}>{weather && weather[info.value]}{info.suffix}</span>
                    </li>
                ))
            }
        </ul>
    );
}
