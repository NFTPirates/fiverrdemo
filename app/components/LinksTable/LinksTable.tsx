import { Coin } from '@/app/types/coin';
import { Currency } from '@/app/types/currency';
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
import styles from './linksTable.module.css';

interface ILinksTableProps {
    rowCoinData?: (Currency | Coin | undefined)[];
    columnCoinData?: Coin[];
    tableCaption: string;
}

export default function LinksTable(props: ILinksTableProps) {
    return (
        <div className={styles.container}>
            <h2 className={styles.container__title}>{props.tableCaption}</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        {props.rowCoinData &&
                            props.rowCoinData.map((cur, index) => {
                                return (
                                    <TableHead key={index} className="w-[20px]">
                                        <div className="flex flex-row gap-4">
                                            <Image
                                                src={cur!.image}
                                                width={20}
                                                height={20}
                                                alt={''}
                                            ></Image>
                                            <p>{cur?.symbol.toUpperCase()}</p>
                                        </div>
                                    </TableHead>
                                );
                            })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.columnCoinData?.map((coin, index) => {
                        return (
                            <TableRow key={index} className="h-[5px]">
                                <TableCell>
                                    <div className="flex flex-row gap-4">
                                        <Image
                                            src={coin!.image}
                                            width={20}
                                            height={20}
                                            alt={''}
                                        ></Image>
                                        <p>{coin.symbol.toUpperCase()}</p>
                                    </div>
                                </TableCell>
                                {props.rowCoinData &&
                                    props.rowCoinData.map((cur, curIndex) => {
                                        return (
                                            <TableCell
                                                key={curIndex}
                                                className="w-[300px]"
                                            >
                                                <div>
                                                    <Link
                                                        href={`1-${coin.symbol.toLowerCase()}-to-${cur?.symbol.toLowerCase()}`}
                                                    >{`${coin.symbol.toUpperCase()} to ${cur?.symbol.toUpperCase()}`}</Link>
                                                </div>
                                            </TableCell>
                                        );
                                    })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
