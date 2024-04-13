import styles from './styles.module.css';
import Conversion from '../components/Conversion/Conversion';
import {
    getCoin,
    getTop15CoinsByMarketCap,
    getTrendingCoins,
} from '../services/coin.service';
import getFiat from '../services/fiat.service';
import { Metadata } from 'next';
import React from 'react';
import LinksTable from '../components/LinksTable/LinksTable';

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
    const cad = getFiat({ fiatId: 'cad' });
    const gbp = getFiat({ fiatId: 'gbp' });
    const chf = getFiat({ fiatId: 'chf' });
    const jpy = getFiat({ fiatId: 'jpy' });
    const aud = getFiat({ fiatId: 'aud' });
    const top15Coins = await getTop15CoinsByMarketCap();
    const trendingCoins = await getTrendingCoins();

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
                <LinksTable
                    tableCaption="Top 15 Crypto Coins By Marketcap VS Fiat Currency"
                    rowCoinData={[cad, gbp, aud, initialFiatcur, chf, jpy]}
                    columnCoinData={top15Coins}
                ></LinksTable>
                <LinksTable
                    tableCaption="Top 15 Crypto Coins By Marketcap VS Top 15 Crypto Coins By User Searches"
                    rowCoinData={trendingCoins}
                    columnCoinData={top15Coins}
                ></LinksTable>
            </div>
        </main>
    );
}
