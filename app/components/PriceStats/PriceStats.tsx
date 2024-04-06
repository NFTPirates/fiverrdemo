import { getCoinPriceAtDate } from '@/app/services/coin.service';
import { Coin } from '@/app/types/coin';
import { Currency } from '@/app/types/currency';
import { formatNumberToPercentageString } from '@/app/utils/utils';
import { add, format } from 'date-fns';

interface IPriceStatsProps {
    coin1?: Coin | Currency;
    coin2?: Coin | Currency;
}

interface IPercentageChangeResult {
    value: string;
    isPositive: boolean;
}

import styles from './priceStats.module.css';
export default async function PriceStats(props: IPriceStatsProps) {
    const conin1Symbol = props.coin1?.symbol.toUpperCase();
    const conin2Symbol = props.coin2?.symbol.toUpperCase();
    const coin1Id = props.coin1?.id;
    const coin2Id = props.coin2?.id;

    const calculatePercentageChange = (props: {
        coin1CurrentPrice?: number;
        coin2CurrentPrice?: number;
        coin1PreviousDatePrice?: number;
        coin2PreviousDatePrice?: number;
    }): IPercentageChangeResult | undefined => {
        if (
            !props.coin1CurrentPrice ||
            !props.coin2CurrentPrice ||
            !props.coin2PreviousDatePrice ||
            !props.coin1PreviousDatePrice
        ) {
            return;
        }

        const conversionNow = props.coin1CurrentPrice / props.coin2CurrentPrice;
        const previousConversion =
            props.coin1PreviousDatePrice / props.coin2PreviousDatePrice;

        const percentageChange =
            ((conversionNow - previousConversion) / previousConversion) * 100;

        const percentageString = formatNumberToPercentageString({
            numberToFormat: percentageChange,
        });

        return {
            value: percentageString,
            isPositive: percentageChange > 0,
        };
    };

    const calculatePercentageChangeAgainstFiat = (props: {
        coin1CurrentPrice?: number;
        coin1PreviousDatePrice?: number;
    }): IPercentageChangeResult | undefined => {
        if (!props.coin1CurrentPrice || !props.coin1PreviousDatePrice) {
            return;
        }

        const percentageChange =
            ((props.coin1CurrentPrice - props.coin1PreviousDatePrice) /
                props.coin1PreviousDatePrice) *
            100;

        const percentageString = formatNumberToPercentageString({
            numberToFormat: percentageChange,
        });

        return {
            value: percentageString,
            isPositive: percentageChange > 0,
        };
    };

    const currentDate = new Date();
    const date24hoursAgo = add(currentDate, { hours: -24 });
    const date7daysAgo = add(currentDate, { days: -7 });
    const date30daysAgo = add(currentDate, { days: -30 });

    const currentPriceCoin2Req = getCoinPriceAtDate({
        coinId: props.coin2?.id,
        date: currentDate,
    });

    const price24HAgoCoin2Req = getCoinPriceAtDate({
        coinId: props.coin2?.id,
        date: date24hoursAgo,
    });
    const price7DAgoCoin2Req = getCoinPriceAtDate({
        coinId: props.coin2?.id,
        date: date7daysAgo,
    });
    const price30DAgoCoin2Req = getCoinPriceAtDate({
        coinId: props.coin2?.id,
        date: date30daysAgo,
    });

    const [
        currentPriceCoin2,
        price24HAgoCoin2,
        price7DAgoCoin2,
        price30DAgoCoin2,
    ] = await Promise.all([
        currentPriceCoin2Req,
        price24HAgoCoin2Req,
        price7DAgoCoin2Req,
        price30DAgoCoin2Req,
    ]);

    let percentageChange24hAgo;
    let percentageChange7DaysAgo;
    let percentageChange30DaysAgo;

    if (
        currentPriceCoin2 &&
        price24HAgoCoin2 &&
        price7DAgoCoin2 &&
        price30DAgoCoin2
    ) {
        const currentPriceCoin1Req = getCoinPriceAtDate({
            coinId: props.coin1?.id,
            date: currentDate,
        });

        const price24HAgoCoin1Req = getCoinPriceAtDate({
            coinId: props.coin1?.id,
            date: date24hoursAgo,
        });
        const price7DAgoCoin1Req = getCoinPriceAtDate({
            coinId: props.coin1?.id,
            date: date7daysAgo,
        });
        const price30DAgoCoin1Req = getCoinPriceAtDate({
            coinId: props.coin1?.id,
            date: date30daysAgo,
        });

        const [
            currentPriceCoin1,
            price24HAgoCoin1,
            price7DAgoCoin1,
            price30DAgoCoin1,
        ] = await Promise.all([
            currentPriceCoin1Req,
            price24HAgoCoin1Req,
            price7DAgoCoin1Req,
            price30DAgoCoin1Req,
        ]);

        percentageChange24hAgo = calculatePercentageChange({
            coin1CurrentPrice: currentPriceCoin1,
            coin2CurrentPrice: currentPriceCoin2,
            coin1PreviousDatePrice: price24HAgoCoin1,
            coin2PreviousDatePrice: price24HAgoCoin2,
        });

        percentageChange7DaysAgo = calculatePercentageChange({
            coin1CurrentPrice: currentPriceCoin1,
            coin2CurrentPrice: currentPriceCoin2,
            coin1PreviousDatePrice: price7DAgoCoin1,
            coin2PreviousDatePrice: price7DAgoCoin2,
        });

        percentageChange30DaysAgo = calculatePercentageChange({
            coin1CurrentPrice: currentPriceCoin1,
            coin2CurrentPrice: currentPriceCoin2,
            coin1PreviousDatePrice: price30DAgoCoin1,
            coin2PreviousDatePrice: price30DAgoCoin2,
        });
        // coin2 is not a crypto , then probably fiat
    } else {
        const currentPriceCoin1Req = getCoinPriceAtDate({
            coinId: props.coin1?.id,
            date: currentDate,
            againstFiat: props.coin2?.id.toLowerCase(),
        });

        const price24HAgoCoin1Req = getCoinPriceAtDate({
            coinId: props.coin1?.id,
            date: date24hoursAgo,
            againstFiat: props.coin2?.id.toLowerCase(),
        });
        const price7DAgoCoin1Req = getCoinPriceAtDate({
            coinId: props.coin1?.id,
            date: date7daysAgo,
            againstFiat: props.coin2?.id.toLowerCase(),
        });
        const price30DAgoCoin1Req = getCoinPriceAtDate({
            coinId: props.coin1?.id,
            date: date30daysAgo,
            againstFiat: props.coin2?.id.toLowerCase(),
        });

        const [
            currentPriceCoin1,
            price24HAgoCoin1,
            price7DAgoCoin1,
            price30DAgoCoin1,
        ] = await Promise.all([
            currentPriceCoin1Req,
            price24HAgoCoin1Req,
            price7DAgoCoin1Req,
            price30DAgoCoin1Req,
        ]);

        percentageChange24hAgo = calculatePercentageChangeAgainstFiat({
            coin1CurrentPrice: currentPriceCoin1,
            coin1PreviousDatePrice: price24HAgoCoin1,
        });

        percentageChange7DaysAgo = calculatePercentageChangeAgainstFiat({
            coin1CurrentPrice: currentPriceCoin1,
            coin1PreviousDatePrice: price7DAgoCoin1,
        });

        percentageChange30DaysAgo = calculatePercentageChangeAgainstFiat({
            coin1CurrentPrice: currentPriceCoin1,
            coin1PreviousDatePrice: price30DAgoCoin1,
        });
    }

    //TODO still needs to work for fiat-cur?
    if (percentageChange24hAgo) {
        return (
            <div className={styles.container}>
                <h2>{`${props.coin1?.symbol.toUpperCase()} to ${props.coin2?.symbol.toUpperCase()} price stats for the ${format(new Date(), 'MMMM yyyy')}`}</h2>
                <div className={styles.container__content}>
                    <div
                        className={styles.container__content__percentageWrapper}
                    >
                        <div className={styles.container__percentageWrapper}>
                            <p>24h Change</p>
                            <p className={'text-2xl'}>
                                {percentageChange24hAgo.value}
                            </p>
                        </div>
                        <div className={styles.container__percentageWrapper}>
                            <p>7 Days Change</p>
                            <p className={'text-2xl'}>
                                {percentageChange7DaysAgo?.value}
                            </p>
                        </div>
                        <div className={styles.container__percentageWrapper}>
                            <p>30 Days Change</p>
                            <p className="text-2xl">
                                {percentageChange30DaysAgo?.value}
                            </p>
                        </div>
                    </div>
                    <p className={styles.container__content__text}>
                        {`Over the past 30 days, ${coin1Id} has lost ${percentageChange30DaysAgo} to ${coin2Id}.
                    The trend and price charts for the past week shows that
                     ${conin1Symbol} has lost ${percentageChange7DaysAgo} to  ${conin2Symbol} and over the
                    past 24 hours, ${coin1Id}  has gained ${percentageChange24hAgo} to ${coin2Id} .`}
                    </p>
                </div>
            </div>
        );
    }
}
