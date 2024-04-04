import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NavigationBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

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
                    <div className="sm:px-10 lg:px-40 py-20"> {children}</div>
                    <Footer></Footer>
                </Providers>
                <SpeedInsights />
            </body>
        </html>
    );
}
