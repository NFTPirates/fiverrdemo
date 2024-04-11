import data from '../data/globalCurrencies.json';
import { Coin } from '../types/coin';
import { CoinSearchResponse } from '../types/coingecko/searchCoinResponse';
import { ISearchResponse } from '../types/coingecko/searchResponse';

const SupportedGeckoFiatCur = [
    'btc',
    'eth',
    'ltc',
    'bch',
    'bnb',
    'eos',
    'xrp',
    'xlm',
    'link',
    'dot',
    'yfi',
    'usd',
    'aed',
    'ars',
    'aud',
    'bdt',
    'bhd',
    'bmd',
    'brl',
    'cad',
    'chf',
    'clp',
    'cny',
    'czk',
    'dkk',
    'eur',
    'gbp',
    'gel',
    'hkd',
    'huf',
    'idr',
    'ils',
    'inr',
    'jpy',
    'krw',
    'kwd',
    'lkr',
    'mmk',
    'mxn',
    'myr',
    'ngn',
    'nok',
    'nzd',
    'php',
    'pkr',
    'pln',
    'rub',
    'sar',
    'sek',
    'sgd',
    'thb',
    'try',
    'twd',
    'uah',
    'vef',
    'vnd',
    'zar',
    'xdr',
    'xag',
    'xau',
    'bits',
    'sats',
];

export default async function coinSearch(props: {
    currentQuery: string;
}): Promise<Coin[] | undefined> {
    const top3SearchedCoins = await getTop3SearchedCoins({
        currentQuery: props.currentQuery,
    });

    const top3Fiat = getTop3EligibleGeckoFiatCurrency({
        currentQuery: props.currentQuery,
    });

    return top3Fiat.concat(top3SearchedCoins);
}

function getTop3EligibleGeckoFiatCurrency(props: {
    currentQuery: string;
}): Coin[] {
    let fil: Array<Coin | undefined> = data.Currencies.map((cur) => {
        const includesCountryName = cur.CountryName.toLowerCase().includes(
            props.currentQuery!
        );
        const includesCurrencyName = cur.Currency.toLowerCase().includes(
            props.currentQuery!
        );
        const includesCountryCode = cur.Code.toLowerCase().includes(
            props.currentQuery!
        );

        if (
            includesCountryCode ||
            includesCountryName ||
            includesCurrencyName
        ) {
            const existsInGecko = SupportedGeckoFiatCur.includes(
                cur.Code.toLowerCase()
            );

            if (existsInGecko) {
                return {
                    id: cur.Code,
                    name: cur.CountryName + ' ' + cur.Currency,
                    image: cur.Flag,
                    symbol: cur.Code,
                };
            }
        }
    });

    const eligibleGeckoFiat: any[] = fil.filter((cur) => cur != undefined);
    const top3FilteredFiat = eligibleGeckoFiat.slice(0, 3);

    return top3FilteredFiat;
}

// TODO move this to server and api here
async function getTop3SearchedCoins(props: {
    currentQuery: string;
}): Promise<Coin[]> {
    const result = await fetch(
        `api/convert/search?query=${props.currentQuery}`
    );

    if (!result.ok) {
        return [];
    }

    const coinsData = (await result.json()) as CoinSearchResponse[];
    const coinsFilteredByMarketCap = coinsData.sort(
        (a, b) => Number(a.market_cap_rank) - Number(b.market_cap_rank)
    );

    const realMarketCapCoins = coinsFilteredByMarketCap.filter(
        (coin) => coin.market_cap_rank !== null
    );

    const top5SearchedCoins = realMarketCapCoins.slice(0, 5);

    const resultTopSearchedCoins: Coin[] = top5SearchedCoins.map((coin) => {
        return {
            id: coin.id,
            image: coin.thumb,
            name: coin.name,
            symbol: coin.symbol,
        };
    });
    return resultTopSearchedCoins;
}

export async function getCoinByTicker(props: {
    currentQuery: string;
}): Promise<Coin | undefined> {
    const url = 'https://pro-api.coingecko.com/api/v3/search';
    const res = await fetch(`${url}?query=${props.currentQuery}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-cg-pro-api-key': process.env.CG_API_KEY!,
        },
    });

    const queryResponse = (await res.json()) as ISearchResponse;

    if (!queryResponse) {
        throw new Error('something went wrong');
    }

    const coin = queryResponse.coins[0];

    if (coin.symbol.toLowerCase() != props.currentQuery) {
        return;
    }

    return {
        id: coin.id,
        image: coin.thumb,
        name: coin.name,
        symbol: coin.symbol,
    };
}
