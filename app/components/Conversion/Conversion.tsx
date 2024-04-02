'use client';
import { getConversion } from '@/app/services/conversion.service';
import { Coin } from '@/app/types/coin';
import { Currency } from '@/app/types/currency';
import { formatNumberToString } from '@/app/utils/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ConversionBox from '../ConversionBox/ConversionBox';
import { SwitchIcon } from '../SwitchIcon';
import styles from './styles.module.css';

interface IConversion {
    defaultCoin1Info: Coin | Currency | undefined;
    defaultCoin2Info: Coin | Currency | undefined;
    initialCoin1Amount?: number;
}

export default function Conversion(props: IConversion) {
    const [coin1Amount, setCoin1Amount] = useState<number>(
        props.initialCoin1Amount ?? 1
    );
    const [coin2Amount, setCoin2Amount] = useState<number>(0);

    const [coin1Info, setCoin1Info] = useState<Coin | Currency | undefined>(
        props.defaultCoin1Info
    );
    const [coin2Info, setCoin2Info] = useState<Coin | Currency | undefined>(
        props.defaultCoin2Info
    );

    useEffect(() => {
        async function getTotalConversion() {
            const coin1Price = coin1Info?.market_data?.current_price?.usd;
            const coin2Price = coin2Info?.market_data?.current_price?.usd;

            const conversion = await getConversion({
                coin1Amount: coin1Amount,
                coin1Id: coin1Info?.id,
                coin2Id: coin2Info?.id,
                coin1CurPrice: coin1Price,
                coin2CurPrice: coin2Price,
            });

            if (!conversion) {
                return;
            }

            setCoin2Amount(conversion);
        }

        getTotalConversion();
    }, [coin1Info, coin2Info, coin1Amount]);

    const handleSwitchButton = () => {
        const coin1 = coin1Info;
        setCoin1Info(coin2Info);
        setCoin2Info(coin1);
    };

    const conversionUrl =
        coin1Amount > 1
            ? `${coin1Amount}-${coin1Info?.id}-to-${coin2Info?.id}`
            : `${coin1Info?.id}-${coin2Info?.id}`;

    return (
        <div className={styles.container}>
            <div className={styles.container__conversionBoxes}>
                <ConversionBox
                    key={'coin1'}
                    coinAmount={coin1Amount}
                    setCoinAmount={setCoin1Amount}
                    coinInfo={coin1Info}
                    setCoinInfo={setCoin1Info}
                ></ConversionBox>
                <Button
                    className={styles.container__conversionBoxes__button}
                    isIconOnly
                    size="lg"
                    aria-label="switch"
                    onClick={handleSwitchButton}
                >
                    <SwitchIcon />
                </Button>
                <ConversionBox
                    coinAmount={coin2Amount}
                    setCoinAmount={setCoin2Amount}
                    coinInfo={coin2Info}
                    setCoinInfo={setCoin2Info}
                ></ConversionBox>
            </div>

            <div className={styles.container__content}>
                <div className={styles.container__content__section}>
                    <h2>{`${formatNumberToString({ numberToFormat: coin1Amount })} ${coin1Info?.symbol} = ${formatNumberToString({ numberToFormat: coin2Amount })} ${coin2Info?.name}`}</h2>
                </div>

                <Button
                    href={conversionUrl}
                    as={Link}
                    variant="solid"
                    className={styles.container__content__button}
                >
                    View Conversion
                </Button>
            </div>
        </div>
    );
}
