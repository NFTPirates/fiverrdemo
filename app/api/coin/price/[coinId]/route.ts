import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { coinId: string } }
) {
    const coinId = params.coinId;
    const url = `https://pro-api.coingecko.com/api/v3/simple/price?ids=${coinId}`;
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'x-cg-pro-api-key': process.env.CG_API_KEY!,
        },
    });
    const data = await res.json();

    return NextResponse.json({ data });
}
