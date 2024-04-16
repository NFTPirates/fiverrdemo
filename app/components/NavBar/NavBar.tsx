'use client';
import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    Link,
} from '@nextui-org/react';
import Image from 'next/image';
const MenuItems = [
    { name: 'Home', link: './' },
    { name: 'Blog', link: './blog' },
    { name: 'Contact Us', link: './contact' },
    { name: 'Privacy & TOS', link: './privacy-tos' },
    { name: 'Newsletter', link: './newsletter' },
    { name: 'About Us', link: './about' },
];

export default function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const renderNavItems = () => {
        const navBarItems = MenuItems.map((item, index) => {
            return (
                <NavbarItem key={index}>
                    <Link
                        className="text-lg"
                        color="foreground"
                        href={item.link}
                    >
                        {item.name}
                    </Link>
                </NavbarItem>
            );
        });

        return navBarItems;
    };

    return (
        <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarBrand>
                    <Link href="./" className="decoration-black">
                        <Image
                            src={'/logo.png'}
                            height={50}
                            width={50}
                            alt=""
                        ></Image>
                        <p className="font-bold text-inherit">
                            CryptoFiatConvert.com
                        </p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="md:flex gap-4" justify="end">
                <NavbarContent
                    className="hidden md:flex gap-6"
                    justify="center"
                >
                    {renderNavItems()}
                </NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className="md:hidden"
                />
            </NavbarContent>
            <NavbarMenu className="gap-6">{renderNavItems()}</NavbarMenu>
        </Navbar>
    );
}
