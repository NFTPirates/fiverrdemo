'use client';
import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
} from '@nextui-org/react';
import { AcmeLogo } from '../AcmeLogo';
const MenuItems = [
    'Converter',
    'News',
    'Blog',
    'Predictions',
    'Calculator',
    'Newsletter',
];

export default function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const renderNavItems = () => {
        const navBarItems = MenuItems.map((item, index) => {
            return (
                <NavbarItem key={index}>
                    <Link className="text-lg" color="foreground" href="#">
                        {item}
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
                    <AcmeLogo />
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
