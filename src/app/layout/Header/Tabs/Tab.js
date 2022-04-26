import React from 'react';
import { Container, Wrapper, TabsContainer, TabName, TabWrapper, TabContainer } from './Tab.style';

const Tab = ({ ...props }) => {
    const { headers } = props;

    const tabs = [];
    if (headers && headers.length) {
        headers.forEach(tab => {
            tabs.push(
            <TabContainer key={tab.index}>
                <TabWrapper>
                    <TabName>
                        {tab.name}
                    </TabName>
                </TabWrapper>
            </TabContainer>);
        });
    }

    return (
        <Container>
            <Wrapper>
                <TabsContainer>
                    {tabs}
                </TabsContainer>
            </Wrapper>
        </Container>
    )
}

export default Tab;
