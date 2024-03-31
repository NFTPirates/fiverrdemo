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

  const result = await fetch(
    `api/coin/price/${lowerCaseCoin1Id}/vsCurrency?vsCurrency=${lowerCaseCoin2Id}`
  );

  // if coins are switched for fiat
  const result1 = await fetch(
    `api/coin/price/${lowerCaseCoin2Id}/vsCurrency?vsCurrency=${lowerCaseCoin1Id}`
  );

  if (result.ok) {
    const res = await result.json();
    if (
      res?.data[lowerCaseCoin1Id] &&
      res?.data[lowerCaseCoin1Id][lowerCaseCoin2Id]
    ) {
      return {
        conversion: res.data[lowerCaseCoin1Id][lowerCaseCoin2Id],
        switched: false,
      };
    }
  }

  if (result1.ok) {
    const res = await result1.json();

    return {
      conversion: res.data[lowerCaseCoin2Id][lowerCaseCoin1Id],
      switched: true,
    };
  }

  return;
}
