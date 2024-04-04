export interface GetCoinHistoryResponse {
    id: string;
    symbol: string;
    name: string;
    market_data?: {
        current_price: {
            usd: number;
        };
    };
    image: {
        small: string;
        thumb: string;
    };
}
