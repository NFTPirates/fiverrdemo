import styles from "./styles.module.css";
import Conversion from "./components/Conversion/Conversion";
import { getCoin } from "./services/coin.service";
import getFiat from "./services/fiat.service";

export default async function Home() {
  const defaultCoinInfo = await getCoin({ coinId: "bitcoin" });
  const initialFiatcur = getFiat({ fiatId: "usd" });

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.container__header}>
          <h1>Global Crypto Converter</h1>
          <h2 className={styles.container__header_subTitle}>
            Convert your fiat coins to crypto and vice verse
          </h2>
        </div>
        <Conversion
          defaultCoin1Info={defaultCoinInfo}
          defaultCoin2Info={initialFiatcur}
        ></Conversion>
      </div>
    </main>
  );
}
