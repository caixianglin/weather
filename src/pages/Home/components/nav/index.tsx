import { Navs } from '@/constants';
import styles from './index.module.css';

export default function Nav() {
    return (
        <div className={styles.nav}>
            <ul className={styles.list}>
            {
                Navs.map(nav => (
                    <li key={nav.id} className={`${styles.item} ${styles.itemActived}`}>
                        <img src={nav.icon} />
                        <span>{nav.title}</span>
                    </li>
                ))
            }
            </ul>
        </div>
    );
}
