"use client";
import { Coin } from "@/app/types/coin";
import { GetCoinResponse } from "@/app/types/coingecko/getCoinResponse";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ConversionBox from "../ConversionBox/ConversionBox";
import { SearchIcon } from "../SearchIcon";
import { SwitchIcon } from "../SwitchIcon";
import styles from "./styles.module.css";

interface IConversionBoxProps {
  trendingCoins: Coin[];
}

export interface IConversionCoin {
  coinData?: GetCoinResponse;
  amount?: number;
}

export default function Conversion(props: IConversionBoxProps) {
  const [coin1Data, setCoin1Data] = useState<GetCoinResponse>();
  const [coin2Data, setCoin2Data] = useState<GetCoinResponse>();

  const [coin1Amount, setCoin1Amount] = useState<number | undefined>(1);
  const [coin2Amount, setCoin2Amount] = useState<number>();

  useEffect(() => {
    const coin1Price = coin1Data?.market_data.current_price.usd;
    const coin2Price = coin2Data?.market_data.current_price.usd;

    if (coin1Price && coin2Price && coin1Amount) {
      const conv = (coin1Price * coin1Amount) / coin2Price;
      setCoin2Amount(conv);
    }
  }, [coin1Data, coin2Data, coin1Amount]);

  const handleSwitchButton = () => {
    const coin1 = coin1Data;
    setCoin1Data(coin2Data);
    setCoin2Data(coin1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__conversionBoxes}>
        <ConversionBox
          trendingCoins={props.trendingCoins}
          setCoin={setCoin1Data}
          initialValue={"bitcoin"}
          key={"coin1"}
          coin={coin1Data}
          coinAmount={coin1Amount}
          setCoinAmount={setCoin1Amount}
        ></ConversionBox>
        <Button
          className={styles.container__conversionBoxes__button}
          isIconOnly
          size="lg"
          aria-label="switch"
          onClick={handleSwitchButton}
        >
          <SwitchIcon />
        </Button>
        <ConversionBox
          trendingCoins={props.trendingCoins}
          setCoin={setCoin2Data}
          initialValue={"usd-coin"}
          key={"coin2"}
          coin={coin2Data}
          coinAmount={coin2Amount}
          setCoinAmount={setCoin2Amount}
        ></ConversionBox>
      </div>

      <div className={styles.container__content}>
        <div className={styles.container__content__section}>
          <p>{`${coin1Amount} ${coin1Data?.symbol} = ${coin2Amount} ${coin2Data?.symbol}`}</p>
        </div>

        <Button>View Conversion</Button>
      </div>
    </div>
  );
}
