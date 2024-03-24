"use client";
import { Coin } from "@/app/types/coin";
import { Input } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { IConversionCoin } from "../Conversion/Conversion";
import NextUiDropdown from "../Dropdown/Dropdown";
import styles from "./styles.module.css";

interface IConversionBoxProps {
  trendingCoins: Coin[];
  setCoin: Dispatch<SetStateAction<IConversionCoin | undefined>>;
}

export default function ConversionBox(props: IConversionBoxProps) {
  const [inputAmount, setInputAmount] = useState<string>("");
  const [selectedCoin, setSelectedCoin] = useState<string | undefined>("");

  const handleValueChange = (value: string) => {
    setInputAmount(value);
    props.setCoin({ symbol: selectedCoin!, amount: Number(inputAmount) });
  };

  return (
    <div className={styles.container}>
      <NextUiDropdown
        trendingCoins={props.trendingCoins}
        setSelectedCoin={setSelectedCoin}
      ></NextUiDropdown>
      <Input
        className={styles.container__input}
        value={inputAmount}
        size={"lg"}
        type="number"
        label="Amount"
        placeholder="1.2"
        onValueChange={handleValueChange}
      />
    </div>
  );
}
