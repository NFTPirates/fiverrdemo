import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `convert page`,
        description: `convert page`,
        keywords:
            'Convert 1 BTC to ETH,1 Bitcoin to Ethereum,BTC,ETH,Bitcoin,Ethereum,crypto calculator, crypto converter',
    };
}

export default async function ContactUsPage() {
    return (
        <main className="px-5 md:w-9/12">
            <div className="my-20">
                <h1>Contact Us</h1>
                <p className="opacity-75">
                    {
                        "At Cryptofiatconvert.com, we're committed to building a seamless and trustworthy platform that meets all your cryptocurrency to fiat currency conversion needs. Understanding that navigating the world of digital currency can sometimes be complex, we're here to offer our support and answer any queries you may have. Whether you're facing a technical issue, need guidance through our services, or simply wish to share your feedback, we're all ears."
                    }
                </p>
            </div>
            <div className="my-20">
                <h2>Reach Out to Us Directly</h2>
                <p className="opacity-75">
                    {
                        "For direct inquiries, support requests, or any feedback, please don't hesitate to get in touch with our dedicated team at contact@cryptofiatconvert.com. We pride ourselves on our swift response time and our unwavering dedication to customer satisfaction. Your questions and comments are invaluable as they help us enhance our platform and serve you better."
                    }
                </p>
            </div>
            <div>
                <h2>Our Commitment to You</h2>
                <p className="opacity-75">
                    At Cryptofiatconvert.com, your experience is our top
                    priority. We strive to provide an intuitive and efficient
                    service that simplifies the conversion process for our
                    users. Our team is continuously working to improve our
                    platform and offerings, ensuring that we stay at the
                    forefront of innovation in the crypto-fiat conversion space.
                </p>
                <br></br>
                <p className="opacity-75">
                    {
                        "We look forward to hearing from you and are eager to assist with any concerns or questions you might have. Your trust in Cryptofiatconvert.com is greatly appreciated, and we're here to support you every step of the way."
                    }
                </p>
            </div>
        </main>
    );
}
