import { getCoinPriceAgainstCurrency } from '@/app/services/price.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { coinId: string } }
) {
    const { searchParams } = new URL(request.url);
    const vsCurrency = searchParams.get('vsCurrency');

    if (!params.coinId || !vsCurrency) {
        throw new Error('params missing');
    }
    const convResult = await getCoinPriceAgainstCurrency({
        coin1Id: params.coinId,
        coin2Id: vsCurrency,
    });

    return NextResponse.json(convResult);
}
