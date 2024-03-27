"use client";
import { Coin } from "@/app/types/coin";
import { GetCoinResponse } from "@/app/types/coingecko/getCoinResponse";
import { input, Input } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IConversionCoin } from "../Conversion/Conversion";
import NextUiDropdown from "../Dropdown/Dropdown";
import styles from "./styles.module.css";

interface IConversionBoxProps {
  trendingCoins: Coin[];
  setCoin: Dispatch<SetStateAction<GetCoinResponse | undefined>>;
  coin: GetCoinResponse | undefined;
  initialValue: string;
  setCoinAmount: Dispatch<SetStateAction<number | undefined>>;
  coinAmount: number | undefined;
}

export default function ConversionBox(props: IConversionBoxProps) {
  const [inputAmount, setInputAmount] = useState<string | undefined>(
    props.coinAmount?.toString()
  );

  const handleValueChange = (value: string) => {
    console.log("test1");
    setInputAmount(value);
    props.setCoinAmount(Number(value));
  };

  useEffect(() => {
    setInputAmount(props.coinAmount?.toString());
  }, [props.coinAmount]);

  return (
    <div className={styles.container}>
      <NextUiDropdown
        trendingCoins={props.trendingCoins}
        setSelectedCoin={props.setCoin}
        initialValue={props.initialValue}
        coin={props.coin}
      ></NextUiDropdown>
      <Input
        className={styles.container__input}
        value={inputAmount}
        size={"lg"}
        type="number"
        label="Amount"
        placeholder="0.00"
        onValueChange={handleValueChange}
      />
    </div>
  );
}
