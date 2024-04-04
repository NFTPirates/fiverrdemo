import { getCoinPriceAtDate } from '@/app/services/coin.service';
import { Coin } from '@/app/types/coin';
import { Currency } from '@/app/types/currency';
import { formatNumberToPercentageString } from '@/app/utils/utils';
import { add } from 'date-fns';
interface IPriceStatsProps {
    coin1?: Coin | Currency;
    coin2?: Coin | Currency;
}

import styles from './priceStats.module.css';
export default async function PriceStats(props: IPriceStatsProps) {
    const calculatePercentageChange = (props: {
        coin1CurrentPrice?: number;
        coin2CurrentPrice?: number;
        coin1PreviousDatePrice?: number;
        coin2PreviousDatePrice?: number;
    }): string | undefined => {
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

        return formatNumberToPercentageString({
            numberToFormat: percentageChange,
        });
    };

    const currentDate = new Date();
    const date24hoursAgo = add(currentDate, { hours: -24 });
    const date7daysAgo = add(currentDate, { days: -7 });
    const date30daysAgo = add(currentDate, { days: -30 });

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
        currentPriceCoin1,
        price24HAgoCoin1,
        price7DAgoCoin1,
        price30DAgoCoin1,
        currentPriceCoin2,
        price24HAgoCoin2,
        price7DAgoCoin2,
        price30DAgoCoin2,
    ] = await Promise.all([
        currentPriceCoin1Req,
        price24HAgoCoin1Req,
        price7DAgoCoin1Req,
        price30DAgoCoin1Req,
        currentPriceCoin2Req,
        price24HAgoCoin2Req,
        price7DAgoCoin2Req,
        price30DAgoCoin2Req,
    ]);

    const percentageChange24hAgo = calculatePercentageChange({
        coin1CurrentPrice: currentPriceCoin1,
        coin2CurrentPrice: currentPriceCoin2,
        coin1PreviousDatePrice: price24HAgoCoin1,
        coin2PreviousDatePrice: price24HAgoCoin2,
    });

    const percentageChange7DaysAgo = calculatePercentageChange({
        coin1CurrentPrice: currentPriceCoin1,
        coin2CurrentPrice: currentPriceCoin2,
        coin1PreviousDatePrice: price7DAgoCoin1,
        coin2PreviousDatePrice: price7DAgoCoin2,
    });

    const percentageChange30DaysAgo = calculatePercentageChange({
        coin1CurrentPrice: currentPriceCoin1,
        coin2CurrentPrice: currentPriceCoin2,
        coin1PreviousDatePrice: price30DAgoCoin1,
        coin2PreviousDatePrice: price30DAgoCoin2,
    });

    console.log(
        percentageChange24hAgo,
        percentageChange7DaysAgo,
        percentageChange30DaysAgo
    );

    //TODO make layout prettier, fix this for all possible currencies and crypto values
    return (
        <div className={styles.container}>
            <h2>{`${props.coin1?.symbol.toUpperCase()} to ${props.coin2?.symbol.toUpperCase()} price stats for the current month`}</h2>
            <div className={styles.container__content__percentageWrapper}>
                <div className={styles.container__percentageWrapper}>
                    <p>24h Change</p>
                    <p className="text-2xl">{percentageChange24hAgo}</p>
                </div>
                <div className={styles.container__percentageWrapper}>
                    <p>7 Days Change</p>
                    <p className="text-2xl">{percentageChange7DaysAgo}</p>
                </div>
                <div className={styles.container__percentageWrapper}>
                    <p>30 Days Change</p>
                    <p className="text-2xl">{percentageChange30DaysAgo}</p>
                </div>
            </div>
            <p>
                Over the past 30 days, Bitcoin has lost -0.46% to Ethereum. The
                trend and price charts for the past week shows that Bitcoin BTC
                has lost -6.14% to Ethereum ETH and over the past 24 hours,
                Bitcoin BTC has gained 0.40% to Ethereum ETH.
            </p>
        </div>
    );
}
