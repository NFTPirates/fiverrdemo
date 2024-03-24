import { Coin } from "../coin";

export interface CoinSearchResponse {
  queryResponse: {
    coins: Coin[];
  };
}
