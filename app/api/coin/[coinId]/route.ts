import { GetCoinResponse } from "@/app/types/coingecko/getCoinResponse";

export async function GET(
  request: Request,
  { params }: { params: { coinId: string } }
) {
  const coinId = params.coinId;
  const optionalQueryParams =
    "localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

  const url = `https://pro-api.coingecko.com/api/v3/coins/${coinId}`;
  const res = await fetch(`${url}?${optionalQueryParams}`, {
    headers: {
      "Content-Type": "application/json",
      "x-cg-pro-api-key": process.env.CG_API_KEY!,
    },
  });

  const queryResponse = await res.json();

  return Response.json({ queryResponse });
}
