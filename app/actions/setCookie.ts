'use server';

import { cookies } from 'next/headers';

export async function setCookie(data: { coin1Id?: string; coin2Id?: string }) {
    cookies().set('coin1Id', data.coin1Id ?? '');
    cookies().set('coin2Id', data.coin2Id ?? '');
}
