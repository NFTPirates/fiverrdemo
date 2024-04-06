import { Coin } from '@/app/types/coin';
import { Currency } from '@/app/types/currency';
import { formatNumberToString } from '@/app/utils/utils';
import styles from './header.module.css';

interface IHeaderProps {
    coin1?: Coin | Currency;
    coin2?: Coin | Currency;
    conversion: number;
    coin1Amount: string;
}

export default function Header(props: IHeaderProps) {
    const coin1Symbol = props.coin1?.symbol.toUpperCase();
    const coin2Symbol = props.coin2?.symbol.toUpperCase();
    const conversion = formatNumberToString({
        numberToFormat: props.conversion * Number(props.coin1Amount),
    });

    return (
        <div className={styles.container}>
            <h1>
                {` Convert ${props.coin1Amount} ${coin1Symbol} to ${coin2Symbol} ( ${props.coin1Amount} ${props.coin1?.id} to ${props.coin2?.id}
                Calculator )`}
            </h1>
            <h2>{`How much is ${props.coin1Amount} ${props.coin1?.id} worth in ${coin2Symbol}?`}</h2>
            <h2>
                {`Current value of 1 ${coin1Symbol} in ${coin2Symbol} is ${conversion}`}
            </h2>

            <div className="lg:w-9/12">
                <p>
                    {` This is the real-time data fetched from our partnered price
                aggregators. At the moment, you are looking at the conversion of
                ${props.coin1Amount} ${coin1Symbol} when ${props.coin1Amount} ${coin1Symbol} is valued at ${conversion} ${coin2Symbol}. Since prices change
                often, it is recommended you come back to this page again to
                check the updated conversion value again.`}
                </p>
            </div>
        </div>
    );
}
