"use client";

import { ICoinHistoricPriceChartData } from "@/app/[pair]/page";
import styles from "./styles.module.css";
import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RadioGroup, Radio } from "@nextui-org/react";

export default function CoinsAreaChart(props: {
  coinsHistoricPriceResponse: ICoinHistoricPriceChartData[];
}) {
  const [selected, setSelected] = React.useState("7");
  const [updatedChartData, setUpdatedChartData] = React.useState();

  useEffect(() => {
    const getChartData = async () => {
      const result = await fetch(
        `/api/coin/bitcoin/marketChart?days=${selected}`
      );

      if (!result.ok) {
        throw new Error("Failed to fetch data");
      }

      setUpdatedChartData(await result.json());
    };

    getChartData();
  }, [selected]);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartContainer__header}>
        <h2 className={styles.chartContainer__header__title}>
          BTC to USD daily chart
        </h2>
        <RadioGroup
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
            data={updatedChartData ?? props.coinsHistoricPriceResponse}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
