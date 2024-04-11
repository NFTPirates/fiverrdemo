import { IGetCoinHistoricPriceResponse } from '../(mainPages)/[pair]/page';
import { Coin } from '../types/coin';
import { GetCoinHistoryResponse } from '../types/coingecko/getCoinHistoryResponse';
import { GetCoinResponse } from '../types/coingecko/getCoinResponse';
import getFiat from './fiat.service';
import { format } from 'date-fns';

interface IGetCoinProps {
    coinId?: string;
}

interface IGetCoinHistoricChart {
    coin1Id: string;
    coin2Id: string;
    days: string;
}

export async function getCoin(props: IGetCoinProps): Promise<Coin | undefined> {
    if (!props.coinId) {
        return;
    }

    const coinId = props.coinId.toLowerCase();
    const optionalQueryParams =
        'localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false';

    const url = `https://pro-api.coingecko.com/api/v3/coins/${coinId}`;
    const res = await fetch(`${url}?${optionalQueryParams}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-cg-pro-api-key': process.env.CG_API_KEY!,
        },
    });

    if (!res.ok) {
        return undefined;
    }

    const data = (await res.json()) as GetCoinResponse;

    if (data.symbol === 'usd+') {
        // there's this extra weird fiat coin
        return undefined;
    }

    const result: Coin = {
        id: data.id,
        image: data.image.thumb,
        market_data: {
            current_price: { usd: data.market_data.current_price.usd },
        },
        name: data.name,
        symbol: data.symbol,
    };

    return result;
}

export async function getCoinHistoricChart(
    props: IGetCoinHistoricChart
): Promise<any> {
    const fiatExists = getFiat({ fiatId: props.coin2Id.toLowerCase() });
    if (fiatExists) {
        const url = `https://pro-api.coingecko.com/api/v3/coins/${props.coin1Id.toLowerCase()}/market_chart?vs_currency=${props.coin2Id.toLowerCase()}&days=${
            props.days
        }&interval=daily`;

        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-cg-pro-api-key': process.env.CG_API_KEY!,
            },
        });

        if (!res.ok) {
            console.log('Failed to fetch data');
            return undefined;
        }

        const data = (await res.json()) as IGetCoinHistoricPriceResponse;

        const chartDataArray: any[] = [];
        if (data) {
            data.prices.map((priceData) => {
                chartDataArray.push({
                    date: new Date(priceData[0]).toLocaleDateString(),
                    price: Number(priceData[1]),
                });
            });
        }

        return chartDataArray;
    } else {
        const coin2 = await getCoin({ coinId: props.coin2Id });

        if (!coin2) {
            return undefined;
        }

        const url = `https://pro-api.coingecko.com/api/v3/coins/${props.coin1Id.toLowerCase()}/market_chart?vs_currency=${
            coin2.symbol
        }&days=${props.days}&interval=daily`;

        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-cg-pro-api-key': process.env.CG_API_KEY!,
            },
        });

        if (!res.ok) {
            console.log('Failed to fetch data');
            return undefined;
        }

        const data = (await res.json()) as IGetCoinHistoricPriceResponse;

        const chartDataArray: any[] = [];
        if (data) {
            data.prices.map((priceData) => {
                chartDataArray.push({
                    date: new Date(priceData[0]).toLocaleDateString(),
                    price: Number(priceData[1]),
                });
            });
        }

        return chartDataArray;
    }
}

interface IGetCoinPriceAtDateProps {
    coinId?: string;
    date: Date;
    againstFiat?: string;
}

export async function getCoinPriceAtDate(props: IGetCoinPriceAtDateProps) {
    if (!props.coinId && props.date) {
        return;
    }
    const date = format(props.date, 'dd-MM-yyyy');
    const url = `https://pro-api.coingecko.com/api/v3/coins/${props.coinId}/history?date=${date}&localization=false`;
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'x-cg-pro-api-key': process.env.CG_API_KEY!,
        },
    });

    if (!res.ok) {
        return;
    }

    const result = (await res.json()) as GetCoinHistoryResponse;

    /* @ts-ignore */
    return result.market_data?.current_price[props.againstFiat ?? 'usd'];
}
