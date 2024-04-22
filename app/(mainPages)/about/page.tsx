import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `convert page`,
        description: `convert page`,
        keywords:
            'Convert 1 BTC to ETH,1 Bitcoin to Ethereum,BTC,ETH,Bitcoin,Ethereum,crypto calculator, crypto converter',
    };
}

export default async function AboutUsPage() {
    return (
        <main className="px-5 md:w-9/12 grid gap-10">
            <div>
                <h1>About Us</h1>
                <p className="opacity-75">
                    Welcome to Cryptofiatconvert.com, your trusted partner in
                    bridging the gap between cryptocurrency and fiat currency.
                    In today’s rapidly evolving digital economy, we recognize
                    the critical need for seamless conversion tools that empower
                    both novice and experienced users to effortlessly navigate
                    the crypto world. Our journey began in 2024, fueled by a
                    shared vision to simplify the complexities of cryptocurrency
                    transactions.
                </p>
            </div>
            <Image src={'/logo.png'} height={100} width={100} alt=""></Image>
            <div>
                <h1>Our Story</h1>
                <p className="opacity-75">
                    The inception of Cryptofiatconvert.com was driven by a clear
                    gap in the market—a need for a reliable, intuitive, and
                    comprehensive tool for converting crypto to fiat and vice
                    versa. Our founders, a team of crypto enthusiasts and
                    fintech innovators, noticed the challenges and hurdles many
                    faced in the crypto space. Whether it was the daunting task
                    of understanding market fluctuations or the lack of
                    straightforward tools for transactional purposes, the
                    obstacles were evident.
                </p>
                <p className="opacity-75">
                    Determined to make a difference, we embarked on a mission in
                    2024 to develop a platform that not only addressed these
                    issues but also set a new standard for accessibility and
                    efficiency in crypto transactions. Our goal was simple: to
                    create a tool that could serve both the seasoned trader and
                    the curious newcomer, providing a seamless bridge between
                    the world of cryptocurrency and traditional fiat currencies.
                </p>
            </div>
            <div>
                <h1>Our Mission</h1>
                <p className="opacity-75">
                    At Cryptofiatconvert.com, our mission is to democratize the
                    access and use of cryptocurrency by providing a
                    user-friendly platform for effortless conversions. We
                    believe in the power of blockchain technology and its
                    potential to transform the global financial landscape. Our
                    platform is designed to empower users by providing them with
                    the tools they need to participate in this digital
                    revolution confidently.
                </p>
            </div>
            <div>
                <h1>Our Contribution to the Crypto World</h1>
                <p className="opacity-75">
                    We are more than just a conversion tool; we are innovators
                    and educators in the crypto space. Our commitment goes
                    beyond facilitating transactions. We aim to educate our
                    users, providing them with the knowledge and resources to
                    make informed decisions in their crypto journey. Through our
                    blog, social media channels, and community forums, we share
                    insights, market trends, and updates on the latest
                    developments in the crypto world.
                </p>
                <p className="opacity-75">
                    We understand that the future of finance is digital, and we
                    are committed to developing new tools and features that
                    anticipate the needs of our users. Our roadmap includes
                    advanced analytics, portfolio management tools, and
                    educational resources designed to enhance the user
                    experience and promote greater adoption of cryptocurrency.
                </p>
            </div>
            <div>
                <h1>The Future</h1>
                <p className="opacity-75">
                    Looking ahead, Cryptofiatconvert.com is poised to continue
                    leading innovation in the crypto space. Our vision for the
                    future is one where converting between crypto and fiat is
                    not just easy but second nature. We are continuously
                    exploring new technologies and partnerships that can enhance
                    our platform and provide even more value to our users. As
                    the crypto world evolves, so too will our services. We are
                    committed to staying at the forefront of this change,
                    ensuring that Cryptofiatconvert.com remains your trusted
                    partner in the digital economy.
                </p>
            </div>
            <div>
                <h1>Join Our Community</h1>
                <p className="opacity-75">
                    We invite you to join our journey and become part of a
                    community that is shaping the future of finance. You can
                    find us and follow our updates on social media:
                </p>
                <div className="flex flex-col mx-5 my-5">
                    <Link href={'https://twitter.com'}>X</Link>
                    <Link href={'https://twitter.com'}>Facebook</Link>
                    <Link href={'https://twitter.com'}>Linkedin</Link>
                </div>

                <p className="opacity-75">News about us</p>
                <div className="flex flex-col mx-5 my-5">
                    <Link href={'https://twitter.com'}>News</Link>
                    <Link href={'https://twitter.com'}>News</Link>
                </div>

                <p className="opacity-75">
                    Together, we can build a world where the conversion between
                    crypto and fiat currencies is seamless, empowering everyone
                    to participate in the global economy.
                </p>
            </div>
        </main>
    );
}
