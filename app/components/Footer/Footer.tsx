import Link from 'next/link';
import SubscribeNewsletter from '../SubscribeNewsletter/SubscribeNewsletter';
import styles from './footer.module.css';

const Legal = [{ name: 'Privacy & TOS', link: './privacy-tos' }];
const ProductLinks = [
    { name: 'Home', link: './' },
    { name: 'Blog', link: './blog' },
    { name: 'Newsletter', link: './newsletter' },
    { name: 'About Us', link: './about' },
    { name: 'Contact Us', link: './contact' },
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
                <div className="hidden md:flex flex flex-col">
                    <h3>Contact</h3>
                    <Link href={'mailto:piratesConvert@conver.com'}>
                        piratesConvert@conver.com
                    </Link>
                </div>
            </div>
            <div className="md:hidden flex flex-col my-10 w-full">
                <h3>Contact</h3>
                <Link href={'mailto:piratesConvert@conver.com'}>
                    piratesConvert@conver.com
                </Link>
            </div>
        </div>
    );
}
