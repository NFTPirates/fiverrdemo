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
  coin1Id: string;
  coind2Symbol: string;
}) {
  const [selected, setSelected] = React.useState("7");
  const [updatedChartData, setUpdatedChartData] = React.useState();

  useEffect(() => {
    const getChartData = async () => {
      const result = await fetch(
        `/api/coin/${props.coin1Id}/marketChart?days=${selected}&currency=${props.coind2Symbol}`
      );

      if (!result.ok) {
        console.log("failed to fetch");
        return;
      }

      setUpdatedChartData(await result.json());
    };

    getChartData();
  }, [selected]);

  if (props.coinsHistoricPriceResponse.length && updatedChartData) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.chartContainer__header}>
          <h2 className={styles.chartContainer__header__title}>
            BTC to USD daily chart
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
                stroke="#e07a5f"
                fill="#81b29a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
