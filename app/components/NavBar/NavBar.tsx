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
    { name: 'Converter', link: './convert' },
    { name: 'News', link: './news' },
    { name: 'Blog', link: './blog' },
    { name: 'Predictions', link: './predictions' },
    { name: 'Calculator', link: './calculator' },
    { name: 'Newsletter', link: './newsletter' },
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
        <Navbar
            maxWidth="full"
            className="lg:px-20"
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent>
                <NavbarBrand>
                    <Image
                        src={'/logo.png'}
                        height={50}
                        width={50}
                        alt=""
                    ></Image>
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="md:flex gap-4" justify="end">
                <NavbarContent
                    className="hidden md:flex gap-4"
                    justify="center"
                >
                    {renderNavItems()}
                </NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className="md:hidden"
                />
            </NavbarContent>
            <NavbarMenu>{renderNavItems()}</NavbarMenu>
        </Navbar>
    );
}
