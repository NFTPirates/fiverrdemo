import styles from "./styles.module.css";
import Conversion from "../components/Conversion/Conversion";

interface IGetAllCoinsResponse {
  id: string;
  symbol: string;
  name: string;
}

export interface IGetCoinHistoricPriceResponse {
  prices: [string[]];
  market_caps: [[]];
  total_volumes: [[]];
}

export interface ICoinHistoricPriceChartData {
  date: string;
  price: number;
}

import CoinsAreaChart from "../components/AreaChart/CoinsAreaChart";
import { getCoin, getCoinHistoricChart } from "../services/coin.service";
import getFiat from "../services/fiat.service";

export default async function Page({ params }: { params: { pair: string } }) {
  const coinsPairArray = params.pair.split("-");

  let coin1Id = "";
  let coin2Id = "";
  let coin1Amount = "";
  if (coinsPairArray.length > 2) {
    coin1Amount = coinsPairArray[0];
    coin1Id = coinsPairArray[1];
    coin2Id = coinsPairArray[3];
  } else {
    coin1Id = coinsPairArray[0];
    coin2Id = coinsPairArray[1];
  }

  const coinsHistoricPriceResponse = await getCoinHistoricChart({
    coin1Id: coin1Id,
    coin2Id: coin2Id,
    days: "7",
  });

  const coin1Data = await getCoin({ coinId: coin1Id });
  const coin2Data = await getCoin({ coinId: coin2Id });

  const coin1Fiat = getFiat({ fiatId: coin1Id });
  const coin2Fiat = getFiat({ fiatId: coin2Id });

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.container__header}>
          <h1 className={styles.container__header__title}>
            {/* {`Convert ${coin1?.symbol} to ${coin2.symbol}`} */}
          </h1>
          <h2 className={styles.container__header_subTitle}>
            Convert your fiat coins to crypto and vice verse
          </h2>
        </div>
        <Conversion
          defaultCoin1Info={coin1Data ?? coin1Fiat}
          defaultCoin2Info={coin2Data ?? coin2Fiat}
          initialCoin1Amount={Number(coin1Amount)}
        ></Conversion>
        <CoinsAreaChart
          coinsHistoricPriceResponse={coinsHistoricPriceResponse}
          coin1Id={coin1Id}
          coin2Id={coin2Id}
        ></CoinsAreaChart>
      </div>
    </main>
  );
}
