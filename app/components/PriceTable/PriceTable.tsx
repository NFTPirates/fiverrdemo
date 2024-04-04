'use client';
import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Image,
} from '@nextui-org/react';
import { Coin } from '@/app/types/coin';
import { Currency } from '@/app/types/currency';
import Link from 'next/link';
import styles from './priceTable.module.css';
import { formatNumberToString } from '@/app/utils/utils';

interface IPriceTableProps {
    priceTableData?: { coin1: number; coin2: number }[];
    defaultCoin1Info: Coin | Currency | undefined;
    defaultCoin2Info: Coin | Currency | undefined;
}

export default function PriceTable(props: IPriceTableProps) {
    const columns = [
        {
            name: props.defaultCoin1Info?.symbol.toUpperCase(),
            uid: 'coin1',
            image: props.defaultCoin1Info?.image,
        },
        {
            name: props.defaultCoin2Info?.symbol.toUpperCase(),
            uid: 'coin2',
            image: props.defaultCoin2Info?.image,
        },
    ];

    const renderCell = React.useCallback(
        (item: { coin1: number; coin2: number }, columnKey: React.Key) => {
            switch (columnKey) {
                case 'coin1':
                    return (
                        <Link
                            className="flex flex-col"
                            href={`${item.coin1}-${props.defaultCoin1Info?.id}-to-${props.defaultCoin2Info?.id}`}
                        >
                            {formatNumberToString({
                                numberToFormat: item.coin1,
                            }) +
                                ' ' +
                                props.defaultCoin1Info?.symbol.toUpperCase()}
                        </Link>
                    );
                case 'coin2':
                    return (
                        <Link
                            className="flex flex-col"
                            href={`${item.coin1}-${props.defaultCoin1Info?.id}-to-${props.defaultCoin2Info?.id}`}
                        >
                            {formatNumberToString({
                                numberToFormat: item.coin2,
                            }) +
                                ' ' +
                                props.defaultCoin2Info?.symbol.toUpperCase()}
                        </Link>
                    );
                default:
                    return '';
            }
        },
        []
    );

    return (
        <div className={styles.container}>
            <Table aria-label="Conversion Values" isStriped>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={
                                column.uid === 'actions' ? 'center' : 'start'
                            }
                        >
                            <div className="flex flex-row items-center w-16 justify-between">
                                <Image
                                    src={column.image}
                                    height={20}
                                    width={20}
                                    alt={''}
                                ></Image>
                                <p>{column.name}</p>
                            </div>
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={props.priceTableData}>
                    {(item) => (
                        <TableRow key={item.coin1}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
