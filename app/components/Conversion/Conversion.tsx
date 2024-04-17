'use client';
import { setCookie } from '@/app/actions/setCookie';
import { getConversion } from '@/app/services/conversion.service';
import { Coin } from '@/app/types/coin';
import { Currency } from '@/app/types/currency';
import { formatNumberToString } from '@/app/utils/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import ConversionBox from '../ConversionBox/ConversionBox';
import { SwitchIcon } from '../SwitchIcon';
import styles from './conversion.module.css';

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

    const coin1 = useMemo(() => {
        return {
            usdPrice: coin1Info?.market_data?.current_price?.usd,
            id: coin1Info?.id,
        };
    }, [coin1Info?.id]);

    const coin2 = useMemo(() => {
        return {
            usdPrice: coin2Info?.market_data?.current_price?.usd,
            id: coin2Info?.id,
        };
    }, [coin2Info?.id]);

    useEffect(() => {
        async function getTotalConversion() {
            console.log('test');

            const conversion = await getConversion({
                coin1Amount: coin1Amount,
                coin1Id: coin1.id,
                coin2Id: coin2.id,
                coin1CurPrice: coin1.usdPrice,
                coin2CurPrice: coin2.usdPrice,
            });

            if (!conversion) {
                return;
            }

            setCoin2Amount(conversion);
        }

        getTotalConversion();
    }, [coin1, coin2, coin1Amount]);

    const handleSwitchButton = () => {
        const coin1 = coin1Info;
        setCoin1Info(coin2Info);
        setCoin2Info(coin1);
    };

    const conversionUrlSymbol = `${coin1Amount}-${coin1Info?.symbol.toLowerCase()}-to-${coin2Info?.symbol.toLowerCase()}`;

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
                    readOnly={true}
                ></ConversionBox>
            </div>

            <div className={styles.container__content}>
                <div className={styles.container__content__section}>
                    <h2>{`${formatNumberToString({ numberToFormat: coin1Amount })} ${coin1Info?.symbol.toUpperCase()} = ${formatNumberToString({ numberToFormat: coin2Amount })} ${coin2Info?.symbol.toUpperCase()}`}</h2>
                </div>

                <Button
                    href={conversionUrlSymbol}
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
