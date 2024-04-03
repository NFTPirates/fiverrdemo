'use client';
import { Coin } from '@/app/types/coin';
import { Currency } from '@/app/types/currency';
import { Input } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';
import NextUiDropdown from '../Dropdown/Dropdown';
import styles from './styles.module.css';

interface IConversionBoxProps {
    setCoinAmount: Dispatch<SetStateAction<number>>;
    coinAmount: number | undefined;
    coinInfo: Coin | Currency | undefined;
    setCoinInfo: Dispatch<SetStateAction<Coin | Currency | undefined>>;
}

export default function ConversionBox(props: IConversionBoxProps) {
    return (
        <div className={styles.container}>
            <NextUiDropdown
                coinInfo={props.coinInfo}
                setCoinInfo={props.setCoinInfo}
            ></NextUiDropdown>
            <Input
                className={styles.container__input}
                value={props.coinAmount?.toString()}
                size={'lg'}
                type="number"
                label="Amount"
                placeholder="0.00"
                onValueChange={(val) => props.setCoinAmount(Number(val))}
            />
        </div>
    );
}
