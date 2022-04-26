import React from 'react';
import { Container } from './Layout.style';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, ...props }) => {
    return (
        <Container>
            <Header {...props} />
            {children}
            <Footer />
        </Container>
    )
}

export default Layout;
