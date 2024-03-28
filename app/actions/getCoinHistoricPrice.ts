"use server";

export async function getCoinHistoricPrice(days?: "7"): Promise<any> {
  const url = `https://pro-api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-cg-pro-api-key": process.env.CG_API_KEY!,
    },
  });

  if (res.ok) {
    return res.json();
  }

  return {
    message: "Please enter a valid email",
  };
}
