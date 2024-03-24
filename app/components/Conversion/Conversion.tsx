"use client";
import { Coin } from "@/app/types/coin";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import ConversionBox from "../ConversionBox/ConversionBox";
import styles from "./styles.module.css";

interface IConversionBoxProps {
  trendingCoins: Coin[];
}

export interface IConversionCoin {
  symbol: string;
  amount: number;
}

export default function Conversion(props: IConversionBoxProps) {
  const [coin1, setCoin1] = useState<IConversionCoin>();
  const [coin2, setCoin2] = useState<IConversionCoin>();

  return (
    <div className={styles.container}>
      <div className={styles.container__conversionBoxes}>
        <ConversionBox
          trendingCoins={props.trendingCoins}
          setCoin={setCoin1}
        ></ConversionBox>
        <ConversionBox
          trendingCoins={props.trendingCoins}
          setCoin={setCoin2}
        ></ConversionBox>
      </div>

      <div className={styles.container__content}>
        <p>test</p>
        <Button>View Conversion</Button>
      </div>
    </div>
  );
}
