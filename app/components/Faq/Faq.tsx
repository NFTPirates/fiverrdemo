'use client';
import React from 'react';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import styles from './faq.module.css';
import { Coin } from '@/app/types/coin';
import { formatNumberToString } from '@/app/utils/utils';
import Link from 'next/link';

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
            <div className={styles.container__info}>
                <h2>
                    Any <span>Questions? </span>
                    {`${props.coin1Amount} ${coin1Symbol} to ${coin2Symbol}`}
                </h2>
                <p className="opacity-75">
                    Don’t find your answer here? just send us a message for any
                    query.
                </p>
                <Button
                    color="primary"
                    variant="bordered"
                    className={styles.container__info__button}
                    href={'/contact'}
                    as={Link}
                >
                    <span>Contact us</span>
                </Button>
            </div>

            <div className="lg:w-1/2">
                <Accordion variant="light" fullWidth={false}>
                    <AccordionItem
                        key="1"
                        aria-label="Accordion 1"
                        title={`What is ${props.coin1Amount} ${coin1Symbol} to ${coin2Symbol} price today`}
                        className={styles.container__accordionTitle}
                    >
                        {`The price for ${props.coin1Amount} ${coin1Symbol} to ${coin2Symbol} today on ${new Date().toLocaleDateString()} is ${formatNumberToString({ numberToFormat: props.conversion * Number(props.coin1Amount) })}`}
                    </AccordionItem>
                    <AccordionItem
                        className={styles.container__accordionTitle}
                        key="2"
                        aria-label="Accordion 2"
                        title={`Where to buy ${props.coin1?.id}`}
                    >
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem
                        className={styles.container__accordionTitle}
                        key="3"
                        aria-label="Accordion 3"
                        title={`Where to buy ${props.coin2?.id}`}
                    >
                        {defaultContent}
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};
