
import React from 'react';
import { ButtonContainer, ButtonText } from './Button.style';

const Button = ({
  btnText,
  onClick,
  extendButtonStyle,
  isLoading,
  isSubmitting,
}) => (
  <div>
     <ButtonContainer
        extendButtonStyle={extendButtonStyle}
        onClick={() => {
          if (onClick && !isSubmitting) onClick();
        }}
      >
        {btnText && <ButtonText>{btnText}</ButtonText>}
      </ButtonContainer>
  </div>
);

export default Button;
