'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Input,
} from '@nextui-org/react';
import { SearchIcon } from '../SearchIcon';
import { Coin } from '../../types/coin';
import { Image } from '@nextui-org/react';
import styles from './styles.module.css';
import coinSearch from '@/app/services/search.service';
import { Currency } from '@/app/types/currency';
import getFiat from '@/app/services/fiat.service';

interface INextUiDropdownProps {
    coinInfo: Coin | Currency | undefined;
    setCoinInfo: Dispatch<SetStateAction<Coin | Currency | undefined>>;
}

export default function NextUiDropdown(props: INextUiDropdownProps) {
    const [selectedKeys, setSelectedKeys] = useState(
        new Set([props.coinInfo?.id ?? ''])
    );
    const [currentQuery, setCurrentQuery] = useState('');
    const [searchResult, setSearchResult] = useState(new Array<Coin>());

    useEffect(() => {
        const getCoinData = async () => {
            const selected = selectedKeys.keys().next().value;

            const selectedFiatResponse = getFiat({ fiatId: selected });

            if (selectedFiatResponse) {
                props.setCoinInfo(selectedFiatResponse);
                setCurrentQuery('');
                return;
            }

            const selectedCoinResponse = await fetch(`api/coin/${selected}`);
            if (!selectedCoinResponse.ok) {
                console.log('something went wrong');
            }

            const selectedCoinData: Coin = await selectedCoinResponse.json();
            props.setCoinInfo(selectedCoinData);
            setCurrentQuery('');
        };

        getCoinData();
    }, [selectedKeys]);

    useEffect(() => {
        const queryApi = async () => {
            const result = await coinSearch({ currentQuery: currentQuery });

            if (result) {
                setSearchResult(result);
            }
        };

        queryApi();
    }, [currentQuery]);

    const handleKeyDown = async (event: any) => {
        //if not letter
        if (event.code === 'Backspace') {
            setCurrentQuery((old) => old.slice(0, old.length - 1));
            return;
        }

        if (event.code !== `Key${event.key.toUpperCase()}`) {
            return;
        }

        setCurrentQuery((old) => old + event.key);
    };
    const createDropdownItems = (): any => {
        const arr: React.JSX.Element[] = [];

        if (searchResult.length > 0) {
            searchResult.map((coin) => {
                arr.push(
                    <DropdownItem key={coin.id} textValue={''}>
                        <div className={styles.dropDownItems__container}>
                            {coin.image && (
                                <Image
                                    src={coin.image}
                                    alt={''}
                                    width={20}
                                    height={20}
                                ></Image>
                            )}
                            <p>{coin.name}</p>
                            <p>{coin.symbol}</p>
                        </div>
                    </DropdownItem>
                );
            });
        }

        return arr;
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="light" size="lg" className="capitalize px-3">
                    <div className={styles.dropDownTrigger__button__content}>
                        <Image
                            width={30}
                            height={30}
                            src={props.coinInfo?.image}
                        ></Image>
                        <p>{props.coinInfo?.symbol}</p>
                    </div>
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection dropdown"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                // @ts-ignore: Unreachable code error
                onSelectionChange={setSelectedKeys}
            >
                <DropdownItem key="search" textValue="test" isReadOnly>
                    <Input
                        classNames={{
                            base: 'max-w-full sm:max-w-[10rem] h-10',
                            mainWrapper: 'h-full',
                            input: 'text-small',
                            inputWrapper:
                                'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Type to search..."
                        size="sm"
                        startContent={
                            <SearchIcon size={18} width={20} height={20} />
                        }
                        type="search"
                        onClear={() => setCurrentQuery('')}
                    />
                </DropdownItem>
                {createDropdownItems()}
            </DropdownMenu>
        </Dropdown>
    );
}
