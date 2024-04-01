export interface Currency {
    id: string;
    symbol: string;
    name: string;
    image: string;
    market_data?: {
        current_price: { usd: number };
    };
}
