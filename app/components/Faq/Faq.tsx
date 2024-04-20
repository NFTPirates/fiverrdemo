'use client';
import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import styles from './faq.module.css';
import { Coin } from '@/app/types/coin';
import { formatNumberToString } from '@/app/utils/utils';

interface IFaqProps {
    coin1?: Coin;
    coin2?: Coin;
    conversion: number;
    coin1Amount: string;
}
export const Faq = (props: IFaqProps) => {
    const defaultContent = 'Lorem ipsum dolor';
    const coin1Symbol = props.coin1?.symbol.toUpperCase();
    const coin2Symbol = props.coin2?.symbol.toUpperCase();

    return (
        <div className={styles.container}>
            <h2>
                Any <span>Questions? </span>
                {`${props.coin1Amount} ${coin1Symbol} to ${coin2Symbol}`}
            </h2>
            <Accordion variant="light">
                <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title={`What is ${props.coin1Amount} ${coin1Symbol} to ${coin2Symbol} price today`}
                    classNames={{ title: 'color: white' }}
                >
                    {`The price for ${props.coin1Amount} ${coin1Symbol} to ${coin2Symbol} today on ${new Date().toLocaleDateString()} is ${formatNumberToString({ numberToFormat: props.conversion * Number(props.coin1Amount) })}`}
                </AccordionItem>
                <AccordionItem
                    key="2"
                    aria-label="Accordion 2"
                    title={`Where to buy ${props.coin1?.id}`}
                    classNames={{ title: 'text-primary' }}
                >
                    {defaultContent}
                </AccordionItem>
                <AccordionItem
                    classNames={{ title: 'text-primary' }}
                    key="3"
                    aria-label="Accordion 3"
                    title={`Where to buy ${props.coin2?.id}`}
                >
                    {defaultContent}
                </AccordionItem>
            </Accordion>
        </div>
    );
};
