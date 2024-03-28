import { IGetCoinHistoricPriceResponse } from "@/app/[pair]/page";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { coinId: string } }
): Promise<NextResponse<any[]>> {
  const searchParams = request.nextUrl.searchParams;
  const days = searchParams.get("days");
  const coinId = params.coinId;

  const url = `https://pro-api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-cg-pro-api-key": process.env.CG_API_KEY!,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await res.json()) as IGetCoinHistoricPriceResponse;
  const chartDataArray: any[] = [];
  if (data) {
    data.prices.map((priceData) => {
      chartDataArray.push({
        date: new Date(priceData[0]).toLocaleDateString(),
        price: Number(priceData[1]),
      });
    });
  }
  return NextResponse.json(chartDataArray);
}
