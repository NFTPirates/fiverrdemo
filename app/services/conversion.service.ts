import { getCoinPriceAgainstCurrency } from './price.service';

interface IGetCoinPriceAgainstCurrency {
    coin1Id?: string;
    coin2Id?: string;
    coin1CurPrice?: number;
    coin2CurPrice?: number;
    coin1Amount: number;
}

export async function getConversion(
    props: IGetCoinPriceAgainstCurrency
): Promise<number | undefined> {
    if (!props.coin1Id || !props.coin2Id) {
        return undefined;
    }

    const result = await fetch(
        `api/coin/price/${props.coin1Id}/vsCurrency?vsCurrency=${props.coin2Id}`
    );

    const convResult = (await result.json()) as any;

    if (convResult?.switched && convResult.conversion) {
        const finalConversionAmount =
            (props.coin1Amount ?? 1) / convResult.conversion;
        return finalConversionAmount;
    }

    if (!convResult?.switched && convResult.conversion) {
        const finalConversionAmount =
            convResult.conversion * (props.coin1Amount ?? 1);
        return finalConversionAmount;
    }

    const coin1Price = props.coin1CurPrice;
    const coin2Price = props.coin2CurPrice;

    if (coin1Price && coin2Price) {
        const finalConversionAmount =
            (coin1Price / coin2Price) * props.coin1Amount ?? 1;
        return finalConversionAmount;
    }
}
