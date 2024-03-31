import { getCoinHistoricChart } from "@/app/services/coin.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { coinId: string } }
): Promise<NextResponse<any[]>> {
  const searchParams = request.nextUrl.searchParams;
  const days = searchParams.get("days");
  const currency = searchParams.get("currency");
  const coinId = params.coinId;

  if (!days || !coinId || !currency) {
    return new NextResponse();
  }

  const result = await getCoinHistoricChart({
    coin1Id: coinId.toLowerCase(),
    coin2Id: currency.toLowerCase(),
    days: days,
  });

  return NextResponse.json(result);
}
