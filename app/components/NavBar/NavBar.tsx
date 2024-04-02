import React from 'react';
import { Navbar, NavbarBrand } from '@nextui-org/react';
import { AcmeLogo } from '../AcmeLogo';

export default function App() {
    return (
        <Navbar isBordered maxWidth="full">
            <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
        </Navbar>
    );
}
