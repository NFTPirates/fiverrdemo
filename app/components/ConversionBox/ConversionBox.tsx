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
}

export default function ConversionBox(props: IConversionBoxProps) {
    console.log(props.coinAmount, 'amount');

    return (
        <div className={styles.container}>
            <NextUiDropdown
                coinInfo={props.coinInfo}
                setCoinInfo={props.setCoinInfo}
            ></NextUiDropdown>
            <Input
                className={styles.container__input}
                value={props.coinAmount}
                size={'lg'}
                type="number"
                label="Amount"
                placeholder="0.00"
                onValueChange={(val) => props.setCoinAmount(Number(val))}
            />
        </div>
    );
}
