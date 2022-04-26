import React from 'react';
import Button from 'app/components/Button';
import { Container, Wrapper, HeaderTitleContainer, HeaderTitleWrapper, Title, extendContactButtonStyle } from './Header.style';
import Tabs from './Tabs';

const Header = ({ ...props }) => {
    return (
        <Container>
            <Wrapper>
                <HeaderTitleContainer>
                    <HeaderTitleWrapper>
                        <Title>
                            Mohammed Magdy Ismael
                        </Title>
                    </HeaderTitleWrapper>
                </HeaderTitleContainer>
                <Tabs { ...props } />
                <div style={{ width: '20%', display: 'flex', justifyContent: 'center' }}>
                    <Button btnText="Contact me" key="contact" extendButtonStyle={extendContactButtonStyle} />
                </div>
            </Wrapper>
        </Container>
    )
}

export default Header;
