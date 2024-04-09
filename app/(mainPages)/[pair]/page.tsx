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
import Header from '@/app/components/Header/Header';
import FollowUsBanner from '@/app/components/FollowUsBanner/FollowUsBanner';
import PriceStats from '@/app/components/PriceStats/PriceStats';
import { cookies } from 'next/headers';

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
    const cookieStore = cookies();
    const coin1Id = cookieStore.get('coin1Id')?.value;
    const coin2Id = cookieStore.get('coin2Id')?.value;
    let coin1Amount = '1';
    if (coinsPairArray.length > 2) {
        coin1Amount = coinsPairArray[0];
    }

    if (!coin1Id || !coin2Id) {
        return {};
    }

    const coin1Data = await getCoin({ coinId: coin1Id });
    const coin2Data = await getCoin({ coinId: coin2Id });

    const coin1Fiat = getFiat({ fiatId: coin1Id });
    const coin2Fiat = getFiat({ fiatId: coin2Id });

    const coin1 = coin1Data ?? coin1Fiat;
    const coin2 = coin2Data ?? coin2Fiat;
    const coin1Symbol = coin1?.symbol?.toUpperCase();
    const coin2Symbol = coin2?.symbol?.toUpperCase();

    return {
        title: `Convert ${coin1Amount} ${coin1Symbol} to ${coin2Symbol} (${coin1Amount} ${coin1?.id} to ${coin2?.id})`,
        description: `Convert ${coin1Amount} ${coin1Symbol} to ${coin2Symbol} (${coin1Amount} ${coin1?.id} to ${coin2?.id})`,
        keywords: `Convert ${coin1Amount} ${coin1Symbol} to ${coin2Symbol} ,${coin1Amount} ${coin1?.id} to ${coin2?.id},${coin1Symbol},${coin2Symbol},${coin1?.id},${coin2?.id},crypto calculator, crypto converter`,
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
    if (!conversion?.conversion) {
        const coin1Price = coin1?.market_data?.current_price.usd;
        const coin2Price = coin2?.market_data?.current_price.usd;

        if (coin1Price && coin2Price) {
            return { conversion: coin1Price / coin2Price };
        }
        return;
    }

    if (conversion.switched) {
        return { conversion: 1 / conversion.conversion };
    }

    return conversion;
}

export default async function Page({ params }: { params: { pair: string } }) {
    const cookieStore = cookies();
    const coin1Id = cookieStore.get('coin1Id')?.value;
    const coin2Id = cookieStore.get('coin2Id')?.value;

    const coinsPairArray = params.pair.split('-');

    let coin1Amount = '1';
    if (coinsPairArray.length > 2) {
        coin1Amount = coinsPairArray[0];
    }

    if (!coin1Id || !coin2Id) {
        throw new Error('something went wrong');
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
    } else if (coin1Data && coin2Data) {
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
                    coin1Amount={coin1Amount}
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
                {/* @ts-ignore */}
                <PriceStats coin1={coin1} coin2={coin2}></PriceStats>
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
                    coin1Amount={coin1Amount}
                ></Faq>
            </div>
        </main>
    );
}
