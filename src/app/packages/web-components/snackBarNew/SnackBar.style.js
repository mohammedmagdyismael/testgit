import styled from 'styled-components';
import Text from '../text/Text';

export const SnackBarWindow = styled.div`
  align-items: flex-end;
  display: flex;
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
`;

export const SnackBarContainer = styled.div`
  border-radius: 8px;
  background-color: ${props => (props.barBackgroundColor ? props.barBackgroundColor : '#31a636')};
  min-height: 48px;
  margin: 0 auto;
  margin-bottom: ${props => (props.show ? '40px' : '-90px')};
  max-width: 50%;
  min-width: 300px;
  padding: 14px 16px;
  position: relative;
  transition: margin 200ms ease-in-out;
  width: auto;
  display: flex;
  flex-direction: row;
`;

export const SnackBarMessage = styled(Text)`
  color: ${props => (props.textColor ? props.textColor : '#fff')};
  letter-spacing: 0.1px;
  margin: 0;
  margin-right: 48px;
  margin: 0px 10px;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;
