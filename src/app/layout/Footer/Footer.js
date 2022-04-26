import React from 'react';
import LinkedinLogo from 'app/assets/linkedin.png';
import GitHubLogo from 'app/assets/github.png';
import UpworkLogo from 'app/assets/upwork.png';
import { Container, Wrapper } from './Footer.style';
import Tabs from './Tabs';

const Footer = ({ ...props }) => {
    const links = [
        {
            index: 0,
            name: 'GitHub',
            link: 'https://github.com/mohammedmagdyismael',
            image: GitHubLogo,
        },
        {
            index: 1,
            name: 'UpWork',
            link: 'https://www.upwork.com/freelancers/~01beb4e017cbe2a6ff',
            image: UpworkLogo,
        },
        {
            index: 2,
            name: 'Linkedin',
            link: 'https://www.linkedin.com/in/mohammedmagdyismael/',
            image: LinkedinLogo,
        }
    ]
    return (
        <Container>
            <Wrapper>
                <Tabs links={links} />
            </Wrapper>
        </Container>
    )
}

export default Footer;
