import GlobalCurrencyData from '../data/globalCurrencies.json';
import { Currency } from '../types/currency';
const GeckoSupportedCurrency = [
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

export default function getFiat(props: {
    fiatId: string;
}): Currency | undefined {
    if (!GeckoSupportedCurrency.includes(props.fiatId.toLowerCase())) {
        return undefined;
    }

    const currencyData = GlobalCurrencyData.Currencies.find(
        (cur) => cur.Code.toLowerCase() === props.fiatId.toLowerCase()
    );

    if (!currencyData) {
        console.log('unsuported currency2');
        return undefined;
    }

    const currency: Currency = {
        id: currencyData.Code,
        image: currencyData.Flag,
        name: currencyData.Currency,
        symbol: currencyData.Code,
    };

    return currency;
}
