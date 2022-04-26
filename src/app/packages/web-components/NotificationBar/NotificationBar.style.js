import styled from 'styled-components';

export const BarContainer = styled.div`
  background: #db3226;
  border-radius: 8px;
  width: 100%;
  height: 45px;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  color: #fff;
  padding: 0px 17px;
  ${props => (props.extendBarContainer ? props.extendBarContainer : '')};
`;

export const IconContainer = styled.div`
  display: inline-flex;
`;
