import { Coin } from '@/app/types/coin';
import { Currency } from '@/app/types/currency';
import { formatNumberToString } from '@/app/utils/utils';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './priceTable.module.css';

interface IPriceTable2Props {
    priceTableData?: { coin1: number; coin2: number }[];
    defaultCoin1Info: Coin | Currency | undefined;
    defaultCoin2Info: Coin | Currency | undefined;
}

export default function PriceTable2(props: IPriceTable2Props) {
    return (
        <div className={styles.container}>
            {/* <h2 className={styles.container__title}>test</h2> */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead key={1} className="w-[20px]">
                            <div className="flex flex-row gap-4">
                                <Image
                                    src={props.defaultCoin1Info!.image}
                                    width={30}
                                    height={20}
                                    alt={''}
                                ></Image>
                                <p>
                                    {props.defaultCoin1Info?.symbol.toUpperCase()}
                                </p>
                            </div>
                        </TableHead>
                        <TableHead key={2} className="w-[20px]">
                            <div className="flex flex-row gap-4">
                                <Image
                                    src={props.defaultCoin2Info!.image}
                                    width={30}
                                    height={20}
                                    alt={''}
                                ></Image>
                                <p>
                                    {props.defaultCoin2Info?.symbol.toUpperCase()}
                                </p>
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.priceTableData?.map((value, index) => {
                        return (
                            <TableRow key={index} className="h-[5px]">
                                <TableCell>
                                    <div className="flex flex-row gap-4">
                                        <Link
                                            className="flex flex-col"
                                            href={`${value.coin1}-${props.defaultCoin1Info?.symbol.toLowerCase()}-to-${props.defaultCoin2Info?.symbol}`}
                                        >
                                            {formatNumberToString({
                                                numberToFormat: value.coin1,
                                            }) +
                                                ' ' +
                                                props.defaultCoin1Info?.symbol.toUpperCase()}
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-row gap-4">
                                        <Link
                                            className="flex flex-col"
                                            href={`${value.coin1}-${props.defaultCoin1Info?.symbol.toLowerCase()}-to-${props.defaultCoin2Info?.symbol}`}
                                        >
                                            {formatNumberToString({
                                                numberToFormat: value.coin2,
                                            }) +
                                                ' ' +
                                                props.defaultCoin2Info?.symbol.toUpperCase()}
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
