import styles from "./styles.module.css";
import Image from "next/image";
import Conversion from "../components/Conversion/Conversion";
import { getTrendingCoinsResponse } from "../types/coingecko/trendingCoinsResponse";
import { Coin } from "../types/coin";

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

async function getTrendingCoins() {
  const trendingURL = "https://pro-api.coingecko.com/api/v3/search/trending";

  const res = await fetch(trendingURL, {
    headers: {
      "Content-Type": "application/json",
      "x-cg-pro-api-key": process.env.CG_API_KEY!,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getAllCoins(): Promise<IGetAllCoinsResponse[]> {
  const url = "https://pro-api.coingecko.com/api/v3/coins/list";

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-cg-pro-api-key": process.env.CG_API_KEY!,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getCoinHistoricPrice(
  days = "7"
): Promise<IGetCoinHistoricPriceResponse> {
  const url = `https://pro-api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-cg-pro-api-key": process.env.CG_API_KEY!,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { pair: string } }) {
  const coinsPairArray = params.pair.split("-");

  const [
    trendingCoinsResponse,
    allCoinsListResponse,
    coinsHistoricPriceResponse,
  ] = await Promise.all([
    getTrendingCoins(),
    getAllCoins(),
    getCoinHistoricPrice("30"),
  ]);

  const coinHistoryChartData: ICoinHistoricPriceChartData[] = new Array();

  if (coinsHistoricPriceResponse) {
    coinsHistoricPriceResponse.prices.map((priceData) => {
      coinHistoryChartData.push({
        date: new Date(priceData[0]).toLocaleDateString(),
        price: Number(priceData[1]),
      });
    });
  }

  const coin1 = allCoinsListResponse?.find(
    (coin) => coin.symbol === coinsPairArray[0]
  );

  const coin2 = allCoinsListResponse?.find(
    (coin) => coin.symbol === coinsPairArray[1]
  );

  if (!coin1 || !coin2) {
    throw new Error("something went wrong");
  }

  const coins = trendingCoinsResponse.coins.map(
    (trendingCoin: { item: getTrendingCoinsResponse }) => {
      const coin: Coin = {
        id: trendingCoin.item.id,
        name: trendingCoin.item.name,
        symbol: trendingCoin.item.symbol,
        thumb: trendingCoin.item.thumb,
      };
      return coin;
    }
  );
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.container__header}>
          <h1 className={styles.container__header__title}>
            {`Convert ${coin1.symbol} to ${coin2.symbol}`}
          </h1>
          <h2 className={styles.container__header_subTitle}>
            Convert your fiat coins to crypto and vice verse
          </h2>
        </div>
        <Conversion
          trendingCoins={coins.slice(1, 10)}
          startingCoin1Symbol={coin1.id}
          startingCoin2Symbol={coin2.id}
        ></Conversion>
        <CoinsAreaChart
          coinsHistoricPriceResponse={coinHistoryChartData}
        ></CoinsAreaChart>
      </div>
    </main>
  );
}
