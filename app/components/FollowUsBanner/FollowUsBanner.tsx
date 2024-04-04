import { Link } from '@nextui-org/react';
import styles from './followUsBanner.module.css';
import { XLogo } from './xLogo';
export default function FollowUsBanner() {
    return (
        <Link className={styles.container} href="https://twitter.com">
            <div className={styles.container__text}>
                <p>Follow us on</p>
                <XLogo></XLogo>
            </div>
        </Link>
    );
}
