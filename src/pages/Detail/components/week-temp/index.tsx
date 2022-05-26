import styles from './index.module.css';
import { daily } from '@/types';

export default function WeekTemp({ weekList = [] }) {
  return (
    <div className={styles.week}>
      {
        (weekList || []).map((item: daily) => (
          <div className={styles.content} key={item.id}>
            <div className={styles.time}>{item.week}</div>
            <div className={styles.icon}>
              <img src={item.icon} />
            </div>
            <div className={styles.temp}>
              <div className={styles.high}>{item.tempHigh}<i>℃</i></div>
              <div className={styles.low}>{item.tempLow}<i>℃</i></div>
            </div>
          </div>
        ))
      }
    </div>
  );
}