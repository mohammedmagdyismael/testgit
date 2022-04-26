import React from 'react';
import Button from 'app/components/Button';
import { Container, Wrapper, HeaderTitleContainer, HeaderTitleWrapper, Title, extendContactButtonStyle } from './ResumeContainer.style';
import BlockContainer from 'app/packages/web-components/blockContainer/BlockContainer';

const ResumeContainer = ({ ...props }) => {
    return (
        <Container>
            <BlockContainer 
                name='BlockContainer'
                icon='plus'
                iconWidth={11}
                buttonText='Click me'
                buttonIcon='plus'
                buttonIconWidth={11}
                onClick={() => {}}
                /* disabled,
                hideButton,
                reverse,
                children, */
            />
        </Container>
    )
}

export default ResumeContainer;
