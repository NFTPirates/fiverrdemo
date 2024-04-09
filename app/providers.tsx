'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

export function Providers({ children }: { children: React.ReactNode }) {
    const [coin1Id, setCoin1Id] = React.useState('');
    const [coin2Id, setCoin2Id] = React.useState('');

    const value = { coin1Id, setCoin1Id, coin2Id, setCoin2Id };

    return (
        <NextUIProvider>
            {/* @ts-ignore */}
            <NextThemesProvider
                attribute="class"
                defaultTheme="light"
                themes={['light', 'dark', 'modernnp']}
            >
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    );
}

export default Providers;
