import styles from './styles.module.css';
import { Metadata, ResolvingMetadata } from 'next';
import CoinsAreaChart from '@/app/components/AreaChart/CoinsAreaChart';
import Conversion from '@/app/components/Conversion/Conversion';
import PriceTable from '@/app/components/PriceTable/PriceTable';
import { getCoin, getCoinHistoricChart } from '@/app/services/coin.service';
import getFiat from '@/app/services/fiat.service';
import { getCoinPriceAgainstCurrency } from '@/app/services/price.service';
import { Faq } from '@/app/components/Faq/Faq';
import { Coin } from '@/app/types/coin';
import { Currency } from '@/app/types/currency';
import { getConversion } from '@/app/services/conversion.service';
import Header from '@/app/components/Header/Header';
import FollowUsBanner from '@/app/components/FollowUsBanner/FollowUsBanner';

export interface IGetCoinHistoricPriceResponse {
    prices: [string[]];
    market_caps: [[]];
    total_volumes: [[]];
}

export interface ICoinHistoricPriceChartData {
    date: string;
    price: number;
}
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

type Props = {
    params: { pair: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
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

    const coin1Data = await getCoin({ coinId: coin1Id });
    const coin2Data = await getCoin({ coinId: coin2Id });

    const coin1Fiat = getFiat({ fiatId: coin1Id });
    const coin2Fiat = getFiat({ fiatId: coin2Id });

    return {
        title: `Convert ${coin1Amount} ${coin1Data?.symbol ?? coin1Fiat?.symbol} to ${coin2Data?.symbol ?? coin2Fiat?.symbol} (${coin1Amount} ${coin1Data?.id ?? coin1Fiat?.id} to ${coin2Data?.id ?? coin2Fiat?.id})`,
        description: `Convert ${coin1Amount} ${coin1Data?.symbol ?? coin1Fiat?.symbol} to ${coin2Data?.symbol ?? coin2Fiat?.symbol} (${coin1Amount} ${coin1Data?.id ?? coin1Fiat?.id} to ${coin2Data?.id ?? coin2Fiat?.id})`,
        keywords:
            'Convert 1 BTC to ETH,1 Bitcoin to Ethereum,BTC,ETH,Bitcoin,Ethereum,crypto calculator, crypto converter',
    };
}

async function getTotalConversion(
    coin1?: Coin | Currency,
    coin2?: Coin | Currency
): Promise<any> {
    const conversion = await getCoinPriceAgainstCurrency({
        coin1Id: coin1?.id,
        coin2Id: coin2?.id,
    });

    //TODO FIX TYPE
    console.log(conversion, 'conv');
    if (!conversion?.conversion) {
        const coin1Price = coin1?.market_data?.current_price.usd;
        const coin2Price = coin2?.market_data?.current_price.usd;
        console.log(coin1Price, 'priice');
        console.log(coin2Price, 'priice');

        if (coin1Price && coin2Price) {
            console.log(coin1Price / coin2Price, 'priice');

            return { conversion: coin1Price / coin2Price };
        }
        return;
    }

    return conversion;
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

    const coin1 = coin1Data ?? coin1Fiat;
    const coin2 = coin2Data ?? coin2Fiat;

    const conversion = await getTotalConversion(coin1, coin2);

    //TODO: remove conversio endpoint
    //TODO: fix faq

    let priceTableData;
    if ((coin1Data && coin2Fiat) || (coin1Fiat && coin2Data)) {
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
                <Header
                    coin1={coin1}
                    coin2={coin2}
                    conversion={conversion?.conversion}
                ></Header>
                <Conversion
                    defaultCoin1Info={coin1}
                    defaultCoin2Info={coin2}
                    initialCoin1Amount={Number(coin1Amount)}
                ></Conversion>
                <FollowUsBanner></FollowUsBanner>
                <CoinsAreaChart
                    coinsHistoricPriceResponse={coinsHistoricPriceResponse}
                    coin1Id={coin1Id}
                    coin2Id={coin2Id}
                ></CoinsAreaChart>
                <div className={styles.container__priceTable}>
                    <PriceTable
                        priceTableData={priceTableData?.normalArray}
                        defaultCoin1Info={coin1}
                        defaultCoin2Info={coin2}
                    ></PriceTable>
                    <PriceTable
                        priceTableData={priceTableData?.switchedArray}
                        defaultCoin1Info={coin2}
                        defaultCoin2Info={coin1}
                    ></PriceTable>
                </div>
                <Faq
                    coin1={coin1}
                    coin2={coin2}
                    conversion={conversion?.conversion}
                ></Faq>
            </div>
        </main>
    );
}
