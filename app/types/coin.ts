export interface Coin {
  id: string;
  symbol: string;
  name: string;
  market_data?: {
    current_price: {
      usd: number;
    };
  };
  image: string;
}
