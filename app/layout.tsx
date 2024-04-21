import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NavigationBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <NavigationBar></NavigationBar>
                    <div className="px-5 md:px-20 py-5"> {children}</div>
                    <Footer></Footer>
                </Providers>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
