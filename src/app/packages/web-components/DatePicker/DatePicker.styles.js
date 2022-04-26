/* eslint-disable indent */
import styled from 'styled-components';

export const PlaceholderContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 85%;
  min-height: 100%;
  border: ${props => (props.isValid ? '1px solid #e3e6ea' : '1px solid #db3226')};
  border-width: ${props => (props.isRtl ? '1px 1px 1px 0px' : '1px 0px 1px 1px')};
  border-radius: ${props => (props.isRtl ? '0px 8px 8px 0px' : '8px 0px 0px 8px')};
  background-color: ${props => (props.isDisabled ? '#f6f8f9' : '#fff')};
  display: flex;
  align-items: center;
  padding: 0px 16px;
  & > div {
    color: ${props => (props.isDisabled ? '#9c9c9c' : 'unset')};
  }
`;

export const PlaceholderTitle = styled.div`
  color: #9c9c9c;
  font-size: ${props => (props.isEmpty ? '16px' : '12px')};
  line-height: ${props => (props.isEmpty ? '40px' : '18px')};
`;

export const Container = styled.div`
  & > div > div > .react-date-picker__wrapper {
    border: ${props =>
      props.isValid ? '1px solid #e3e6ea !important' : '1px solid #db3226 !important'};
    border-radius: 8px;
  }
`;

export const IsRequiredNote = styled.p`
  display: inline-flex;
  margin: 0px 3px;
  color: #db3226;
`;
