import { getCoin } from '@/app/services/coin.service';
import { Coin } from '@/app/types/coin';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: { coinId: string };
    }
): Promise<NextResponse<Coin | undefined>> {
    if (!params.coinId) {
        throw new Error('Coin id required');
    }

    const result = await getCoin({ coinId: params.coinId });

    return NextResponse.json(result);
}
