import styles from './styles.module.css';
import Conversion from '../components/Conversion/Conversion';

export interface IGetCoinHistoricPriceResponse {
    prices: [string[]];
    market_caps: [[]];
    total_volumes: [[]];
}

export interface ICoinHistoricPriceChartData {
    date: string;
    price: number;
}

import CoinsAreaChart from '../components/AreaChart/CoinsAreaChart';
import { getCoin, getCoinHistoricChart } from '../services/coin.service';
import getFiat from '../services/fiat.service';
import PriceTable from '../components/PriceTable/PriceTable';
import { getCoinPriceAgainstCurrency } from '../services/price.service';

const PriceThresholdsArray = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

async function getPriceTableDataForFiat(props: {
    coin1Id: string;
    coin2Id: string;
}): Promise<{
    normalArray: { coin1: number; coin2: number }[];
    switchedArray: { coin1: number; coin2: number }[];
}> {
    const convResult = await getCoinPriceAgainstCurrency({
        coin1Id: props.coin1Id,
        coin2Id: props.coin2Id,
    });

    const pricesArray = PriceThresholdsArray.map((element) => {
        return {
            coin1: element,
            coin2: element * convResult.conversion,
        };
    });

    const switchedPriceArray = PriceThresholdsArray.map((element) => {
        return {
            coin1: element,
            coin2: element / convResult.conversion,
        };
    });

    return { normalArray: pricesArray, switchedArray: switchedPriceArray };
}

async function getPriceTableDataForCoins(props: {
    coin1Price?: number;
    coin2Price?: number;
}): Promise<{
    normalArray?: { coin1: number; coin2: number }[];
    switchedArray?: { coin1: number; coin2: number }[];
}> {
    if (props.coin1Price && props.coin2Price) {
        const pricesArray = PriceThresholdsArray.map((element) => {
            return {
                coin1: element,
                coin2: element * (props.coin1Price! / props.coin2Price!),
            };
        });

        const switchedPriceArray = PriceThresholdsArray.map((element) => {
            return {
                coin1: element,
                coin2: element * (props.coin2Price! / props.coin1Price!),
            };
        });
        return { normalArray: pricesArray, switchedArray: switchedPriceArray };
    }

    return {};
}

export default async function Page({ params }: { params: { pair: string } }) {
    const coinsPairArray = params.pair.split('-');
    let coin1Id = '';
    let coin2Id = '';
    let coin1Amount = '1';
    if (coinsPairArray.length > 2) {
        coin1Amount = coinsPairArray[0];
        coin1Id = coinsPairArray[1];
        coin2Id = coinsPairArray[3];
    } else {
        coin1Id = coinsPairArray[0];
        coin2Id = coinsPairArray[1];
    }

    const coinsHistoricPriceResponse = await getCoinHistoricChart({
        coin1Id: coin1Id,
        coin2Id: coin2Id,
        days: '7',
    });

    const coin1Data = await getCoin({ coinId: coin1Id });
    const coin2Data = await getCoin({ coinId: coin2Id });

    const coin1Fiat = getFiat({ fiatId: coin1Id });
    const coin2Fiat = getFiat({ fiatId: coin2Id });

    let priceTableData;
    if (coin1Data && coin2Fiat) {
        priceTableData = await getPriceTableDataForFiat({
            coin1Id: coin1Id,
            coin2Id: coin2Id,
        });
    } else if (coin1Data && coin1Data) {
        priceTableData = await getPriceTableDataForCoins({
            coin1Price: coin1Data?.market_data?.current_price.usd,
            coin2Price: coin2Data?.market_data?.current_price.usd,
        });
    }

    return (
        <main>
            <div className={styles.container}>
                <div className={styles.container__header}>
                    <h1 className={styles.container__header__title}>
                        {/* {`Convert ${coin1?.symbol} to ${coin2.symbol}`} */}
                    </h1>
                    <h2 className={styles.container__header_subTitle}>
                        Convert your fiat coins to crypto and vice verse
                    </h2>
                </div>
                <Conversion
                    defaultCoin1Info={coin1Data ?? coin1Fiat}
                    defaultCoin2Info={coin2Data ?? coin2Fiat}
                    initialCoin1Amount={Number(coin1Amount)}
                ></Conversion>
                <CoinsAreaChart
                    coinsHistoricPriceResponse={coinsHistoricPriceResponse}
                    coin1Id={coin1Id}
                    coin2Id={coin2Id}
                ></CoinsAreaChart>
                <div className={styles.container__priceTable}>
                    <PriceTable
                        priceTableData={priceTableData?.normalArray}
                        defaultCoin1Info={coin1Data ?? coin1Fiat}
                        defaultCoin2Info={coin2Data ?? coin2Fiat}
                    ></PriceTable>
                    <PriceTable
                        priceTableData={priceTableData?.switchedArray}
                        defaultCoin1Info={coin2Data ?? coin2Fiat}
                        defaultCoin2Info={coin1Data ?? coin1Fiat}
                    ></PriceTable>
                </div>
            </div>
        </main>
    );
}
