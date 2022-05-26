import styles from './index.module.css';
import { Hourly } from '@/types';

export default function HoursTemp({ hourList = [] }) {
  return (
    <div className={styles.hours}>
      <ul>
        {
          (hourList || []).map((item: Hourly) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.temp}>{item.temp}<i>℃</i></div>
              <span>{item.time}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}