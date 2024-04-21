'use client';

import styles from './areaChart.module.css';
import React, { useEffect } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Label,
    ResponsiveContainer,
} from 'recharts';
import { RadioGroup, Radio } from '@nextui-org/react';
import { ICoinHistoricPriceChartData } from '@/app/(mainPages)/[pair]/page';
//TODO move this type

export default function CoinsAreaChart(props: {
    coinsHistoricPriceResponse: ICoinHistoricPriceChartData[];
    coin1Id?: string;
    coin2Id?: string;
}) {
    const [selected, setSelected] = React.useState<string>('7');
    const [updatedChartData, setUpdatedChartData] = React.useState();

    useEffect(() => {
        const getChartData = async () => {
            const url = `/api/coin/${props.coin1Id}/marketChart?days=${selected}&currency=${props.coin2Id}`;
            const result = await fetch(url);

            if (!result.ok) {
                return;
            }

            const data = await result.json();

            setUpdatedChartData(data);
        };

        try {
            getChartData();
        } catch (err) {
            console.log(err, 'error');
        }
    }, [selected]);

    if (props.coinsHistoricPriceResponse?.length) {
        return (
            <div className={styles.chartContainer}>
                <div className={styles.chartContainer__header}>
                    <h2 className={styles.chartContainer__header__title}>
                        {`${props.coin1Id?.toUpperCase()} to ${props.coin2Id?.toUpperCase()} `}{' '}
                        <span>daily chart</span>
                    </h2>
                    <RadioGroup
                        className={styles.chartContainer__header__radio}
                        color="danger"
                        orientation="horizontal"
                        value={selected}
                        onValueChange={setSelected}
                    >
                        <Radio value="7">7d</Radio>
                        <Radio value="30">30d</Radio>
                    </RadioGroup>
                </div>
                <div className={styles.chartContainer__chart}>
                    <ResponsiveContainer>
                        <AreaChart
                            width={500}
                            height={400}
                            data={
                                updatedChartData ??
                                props.coinsHistoricPriceResponse
                            }
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id="colorUv"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#8884d8"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#8884d8"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date">
                                <Label
                                    value="Date"
                                    offset={0}
                                    position="insideBottom"
                                />
                            </XAxis>
                            <YAxis>
                                <Label
                                    value="Price"
                                    offset={10}
                                    position="insideLeft"
                                    angle={-90}
                                />
                            </YAxis>
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#e07a5f"
                                fill="url(#colorUv)"
                                fillOpacity={1}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
