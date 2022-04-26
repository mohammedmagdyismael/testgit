import styled from 'styled-components';


export const ButtonContainer = styled.div`
  background: #f1f4f6;
  color: #484848;
  border-radius: 8px;
  width: fit-content;
  cursor: pointer;
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  ${props => (props.extendButtonStyle ? props.extendButtonStyle : '')};
`;

export const ButtonText = styled.p`
  text-align: center;
  margin: 0px 5px;
`;
