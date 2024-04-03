import styles from './styles.module.css';
import Conversion from '../components/Conversion/Conversion';
import { getCoin } from '../services/coin.service';
import getFiat from '../services/fiat.service';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const defaultCoinInfo = await getCoin({ coinId: 'bitcoin' });
    const initialFiatcur = getFiat({ fiatId: 'usd' });

    return {
        title: `Convert 1 ${defaultCoinInfo?.symbol} to ${initialFiatcur?.symbol} (1 ${defaultCoinInfo?.id} to ${initialFiatcur?.id})`,
        description: `Convert 1 ${defaultCoinInfo?.symbol} to ${initialFiatcur?.symbol} (1 ${defaultCoinInfo?.id} to ${initialFiatcur?.id})`,
        keywords:
            'Convert 1 BTC to ETH,1 Bitcoin to Ethereum,BTC,ETH,Bitcoin,Ethereum,crypto calculator, crypto converter',
    };
}

export default async function Home() {
    const defaultCoinInfo = await getCoin({ coinId: 'bitcoin' });
    const initialFiatcur = getFiat({ fiatId: 'usd' });

    return (
        <main>
            <div className={styles.container}>
                <div className={styles.container__header}>
                    <h1>Global Crypto Converter</h1>
                    <h2 className={styles.container__header_subTitle}>
                        Convert your fiat coins to crypto and vice verse
                    </h2>
                </div>
                <Conversion
                    defaultCoin1Info={defaultCoinInfo}
                    defaultCoin2Info={initialFiatcur}
                ></Conversion>
            </div>
        </main>
    );
}
