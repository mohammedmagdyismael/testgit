import React from 'react';
import { 
    Container, 
    Wrapper, 
    TabsContainer, 
    TabName, 
    TabWrapper, 
    TabContainer,
    LogoImage, 
    TabContent,
} from './Tab.style';

const Tab = ({ ...props }) => {
    const { links } = props;

    const tabs = [];
    if (links && links.length) {
        links.forEach(tab => {
            tabs.push(
            <TabContainer href={tab.link} key={tab.index} target="_blank">
                <TabWrapper>
                    <TabContent>
                        <LogoImage src={tab.image} alt={tab.name} />
                        <TabName>
                            {tab.name}
                        </TabName>
                    </TabContent>
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
