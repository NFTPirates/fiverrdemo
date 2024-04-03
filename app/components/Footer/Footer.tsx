import Link from 'next/link';
import SubscribeNewsletter from '../SubscribeNewsletter/SubscribeNewsletter';
import styles from './footer.module.css';

const Legal = [
    { name: 'Terms & Conditions', link: './convert' },
    { name: 'Privacy Policy', link: './news' },
];
const ProductLinks = [
    { name: 'Converter', link: './convert' },
    { name: 'News', link: './news' },
    { name: 'Blog', link: './blog' },
    { name: 'Predictions', link: './predictions' },
    { name: 'Calculator', link: './calculator' },
    { name: 'Newsletter', link: './newsletter' },
];
export default function Footer() {
    return (
        <div className={styles.container}>
            <SubscribeNewsletter></SubscribeNewsletter>
            <div className={styles.container__info}>
                <div className={styles.container__Column}>
                    <h3>Product</h3>
                    {ProductLinks.map((item, index) => {
                        return (
                            <Link key={index} href={item.link}>
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
                <div className={styles.container__Column}>
                    <h3>Legal</h3>
                    {Legal.map((item, index) => {
                        return (
                            <Link key={index} href={item.link}>
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
                <div className={styles.container__Column}>
                    <h3>Contact</h3>
                    <Link href={'mailto:piratesConvert@conver.com'}>
                        piratesConvert@conver.com
                    </Link>
                </div>
            </div>
        </div>
    );
}
