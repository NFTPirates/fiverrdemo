import ConversionBox from "./components/ConversionBox/ConversionBox";
import { Coin } from "./types/coin";
import { getTrendingCoinsResponse } from "./types/coingecko/trendingCoinsResponse";
import styles from "./styles.module.css";
import Conversion from "./components/Conversion/Conversion";

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

export default async function Home() {
  const data = await getTrendingCoins();

  console.log(data.coins);
  const coins = data.coins.map(
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
        <div className={styles.container__title}>
          <h2>Global Crypto Converter</h2>
          <h3>Convert your fiat coins to crypto and vice verse</h3>
        </div>
        <Conversion trendingCoins={coins.slice(1, 10)}></Conversion>
      </div>
    </main>
  );
}
