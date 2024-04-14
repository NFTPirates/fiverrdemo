import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'Rogerbot',
                disallow: ['/'],
            },
            {
                userAgent: 'Exabot',
                disallow: ['/'],
            },
            {
                userAgent: 'MJ12bot',
                disallow: ['/'],
            },
            {
                userAgent: 'Dotbot',
                disallow: ['/'],
            },
            {
                userAgent: 'Gigabot',
                disallow: ['/'],
            },
            {
                userAgent: 'AhrefsBot',
                disallow: ['/'],
            },
            {
                userAgent: 'SemrushBot',
                disallow: ['/'],
            },
            {
                userAgent: 'SemrushBot-SA',
                disallow: ['/'],
            },
        ],
    };
}
