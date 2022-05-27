import { WeathersStatus } from '@/constants'
import { history } from 'ice';
import { getCurrentDay } from '@/utils';
import moment from 'moment';
import styles from './index.module.css';

interface CardProps {
    location?: any;
    weather?: any;
}

export default function WeatherCard(props: CardProps) {
    const { location, weather } = props;

    return (
        <div className={styles.card}>
            <img className={styles.img} src={WeathersStatus[weather?.main]} />
            <div className={styles.cardContent}>
                <h3>{location.city || '-'}, {location.province || '-'}</h3>
                <div className={styles.info}>
                    <div className={styles.infoLeft}>
                        <p>{weather?.temp}<i>℃</i></p>
                        <span>{getCurrentDay(moment().day())}, {moment().hour()} {moment().format('a')}</span>
                    </div>
                    <div className={styles.infoRight}>
                        {
                            weather?.mainList.map((item, index) => (
                                <span key={index} style={
                                    index % 2 === 0
                                    ? {padding: '2px 26px', backgroundColor: 'rgba(212, 66, 111, 0.5)'}
                                    : {padding: '2px 15px', backgroundColor: 'rgba(106, 117, 186, 0.5)'}
                                }>{item}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
            <button className={styles.button} onClick={() => {
                history?.push(`/detail?latitude=${location.latitude}&longitude=${location.longitude}`);
            }}>详情</button>
        </div>
    );
}
