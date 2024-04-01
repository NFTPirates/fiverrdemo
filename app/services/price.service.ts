interface IgetCoinPriceAgainstCurrency {
    coin1Id?: string;
    coin2Id?: string;
}

export async function getCoinPriceAgainstCurrency(
    props: IgetCoinPriceAgainstCurrency
): Promise<any> {
    if (!props.coin1Id || !props.coin2Id) {
        return;
    }

    const lowerCaseCoin1Id = props.coin1Id.toLowerCase();
    const lowerCaseCoin2Id = props.coin2Id.toLowerCase();

    const url1 = `https://pro-api.coingecko.com/api/v3/simple/price?ids=${lowerCaseCoin1Id}&vs_currencies=${lowerCaseCoin2Id}`;
    const url2 = `https://pro-api.coingecko.com/api/v3/simple/price?ids=${lowerCaseCoin2Id}&vs_currencies=${lowerCaseCoin1Id}`;

    const res1 = await fetch(url1, {
        headers: {
            'Content-Type': 'application/json',
            'x-cg-pro-api-key': process.env.CG_API_KEY!,
        },
    });

    const res2 = await fetch(url2, {
        headers: {
            'Content-Type': 'application/json',
            'x-cg-pro-api-key': process.env.CG_API_KEY!,
        },
    });

    if (res1.ok) {
        const result = await res1.json();

        if (
            result[lowerCaseCoin1Id] &&
            result[lowerCaseCoin1Id][lowerCaseCoin2Id]
        ) {
            return {
                conversion: result[lowerCaseCoin1Id][lowerCaseCoin2Id],
                switched: false,
            };
        }
    }

    if (res2.ok) {
        const result = await res2.json();

        return {
            conversion: result[lowerCaseCoin2Id][lowerCaseCoin1Id],
            switched: true,
        };
    }

    return;
}
