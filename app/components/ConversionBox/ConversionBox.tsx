'use client';
import { Coin } from '@/app/types/coin';
import { Currency } from '@/app/types/currency';
import { formatNumberToString } from '@/app/utils/utils';
import { Input } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';
import NextUiDropdown from '../Dropdown/Dropdown';
import styles from './conversionBox.module.css';

interface IConversionBoxProps {
    setCoinAmount: Dispatch<SetStateAction<number>>;
    coinAmount: number | undefined;
    coinInfo: Coin | Currency | undefined;
    setCoinInfo: Dispatch<SetStateAction<Coin | Currency | undefined>>;
    readOnly?: boolean;
}

export default function ConversionBox(props: IConversionBoxProps) {
    const amountValue = () => {
        if (props.coinAmount && props.coinAmount < 0.00001) {
            return props.coinAmount.toFixed(14);
        }

        return props.coinAmount;
    };

    return (
        <div className={styles.container}>
            <NextUiDropdown
                coinInfo={props.coinInfo}
                setCoinInfo={props.setCoinInfo}
            ></NextUiDropdown>
            <Input
                className={styles.container__input} /* @ts-ignore */
                value={amountValue()}
                size={'lg'}
                type="number"
                label="Amount"
                readOnly={props.readOnly}
                placeholder="0.00"
                onValueChange={(val) => props.setCoinAmount(Number(val))}
            />
        </div>
    );
}
