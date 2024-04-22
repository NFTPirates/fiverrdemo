import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `convert page`,
        description: `convert page`,
        keywords:
            'Convert 1 BTC to ETH,1 Bitcoin to Ethereum,BTC,ETH,Bitcoin,Ethereum,crypto calculator, crypto converter',
    };
}

export default function PrivacyTosPage() {
    return (
        <main className="px-5 md:w-9/12 grid gap-10">
            <div>
                <h1>{'Privacy Policy & Terms and Conditions'}</h1>
                <p>{`Last updated: 04-04-2024`}</p>
                <p className="opacity-75">
                    Welcome to Cryptofiatconvert.com. Your privacy and trust are
                    paramount to us. This document outlines how we collect, use,
                    and protect your personal information, as well as the terms
                    under which we provide our services. By using our website,
                    you agree to the following terms and policies.
                </p>
            </div>
            <div>
                <h2>Information Collection and Use</h2>
                <p className="opacity-75">
                    We collect information to provide better services to all our
                    users. The types of information we collect include:
                </p>
                <br></br>
                <p className="opacity-75">
                    Personal Information: When you sign up for a
                    Cryptofiatconvert.com account, we may ask for personal
                    information, such as your email address, to send updates or
                    respond to inquiries. Transactional Data: We collect
                    transactional data related to your cryptocurrency to fiat
                    conversions, including transaction amounts and timestamps.
                    Cookies and Usage Data: We use cookies and similar
                    technologies to track the activity on our service and hold
                    certain information to improve and analyze our service. Data
                    Protection
                </p>
                <br></br>

                <p className="opacity-75">
                    We implement a variety of security measures to maintain the
                    safety of your personal information. However, no method of
                    transmission over the Internet or method of electronic
                    storage is 100% secure, and we cannot guarantee its absolute
                    security.
                </p>
            </div>
            <div>
                <h2>Data Sharing</h2>
                <p className="opacity-75">
                    We do not sell, trade, or otherwise transfer to outside
                    parties your personally identifiable information. This does
                    not include trusted third parties who assist us in operating
                    our website, conducting our business, or servicing you, so
                    long as those parties agree to keep this information
                    confidential.
                </p>
            </div>
            <div>
                <h2>Your Rights</h2>
                <p className="opacity-75">
                    You have the right to access, update, or delete the
                    information we have on you. Whenever made possible, you can
                    access, update, or request deletion of your personal
                    information directly within your account settings section.
                </p>
            </div>
            <div>
                <h1>Terms and Conditions</h1>
                <h2>Use of the Service</h2>
                <p className="opacity-75">
                    Cryptofiatconvert.com provides a platform for converting
                    cryptocurrency to fiat currency. Users must ensure that
                    their activities on the site comply with all applicable laws
                    and regulations.
                </p>
                <br></br>
                <p className="opacity-75">Service Changes and Availability</p>
                <br></br>
                <p className="opacity-75">
                    We reserve the right to modify or discontinue, temporarily
                    or permanently, the service (or any part thereof) with or
                    without notice. We shall not be liable to you or to any
                    third party for any modification, suspension, or
                    discontinuance of the service.
                </p>
            </div>
            <div>
                <h2>Account Security</h2>
                <p className="opacity-75">
                    {
                        'You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.'
                    }
                </p>
            </div>
            <div>
                <h2>Intellectual Property</h2>
                <p className="opacity-75">
                    The service and its original content, features, and
                    functionality are and will remain the exclusive property of
                    Cryptofiatconvert.com and its licensors. Our trademarks and
                    trade dress may not be used in connection with any product
                    or service without the prior written consent of
                    Cryptofiatconvert.com.
                </p>
            </div>
            <div>
                <h2>Limitation of Liability</h2>
                <p className="opacity-75">
                    In no event will Cryptofiatconvert.com, nor its directors,
                    employees, partners, agents, suppliers, or affiliates, be
                    liable for any indirect, incidental, special, consequential,
                    or punitive damages, including without limitation, loss of
                    profits, data, use, goodwill, or other intangible losses,
                    resulting from your access to or use of or inability to
                    access or use the service.
                </p>
            </div>
            <div>
                <h2>Governing Law</h2>
                <p className="opacity-75">
                    These Terms shall be governed and construed in accordance
                    with the laws of [Your Country], without regard to its
                    conflict of law provisions.
                </p>
            </div>
            <div>
                <h2>Changes to This Policy</h2>
                <p className="opacity-75">
                    We reserve the right to update or change our Privacy Policy
                    and Terms and Conditions at any time. You are advised to
                    review this page periodically for any changes.
                </p>
            </div>
            <div>
                <h2>Contact Us</h2>
                <p className="opacity-75">
                    For any questions or comments about these Terms, please
                    contact us at contact@cryptofiatconvert.com.
                </p>
            </div>
        </main>
    );
}
