import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `convert page`,
        description: `convert page`,
        keywords:
            'Convert 1 BTC to ETH,1 Bitcoin to Ethereum,BTC,ETH,Bitcoin,Ethereum,crypto calculator, crypto converter',
    };
}

export default async function NewsletterPage() {
    return <main>newsletter page</main>;
}
