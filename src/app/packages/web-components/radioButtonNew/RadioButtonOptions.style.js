import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark:after {
    left: 29.17%;
    right: 29.17%;
    top: 29.17%;
    bottom: 29.17%;
    border-radius: 40px;
    background: white;
  }

  & > input:checked ~ .checkmark:after {
    display: block;
  }
`;

export const RadioButton = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  top: 0;
  left: 0;
`;

export const CheckMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  border: 1px solid #d9d9da;
  background-color: ${props => (props.isChecked ? '#0070cd' : '#fff')};
  &:after {
    content: '';
    position: absolute;
    display: none;
  }
  &:after {
    left: 29.17%;
    right: 29.17%;
    top: 29.17%;
    bottom: 29.17%;
    border-radius: 40px;
    background: white;
  }
`;

export const RadioButtonItemName = styled.p`
  font-size: 13px;
  display: flex;
  align-items: center;
  color: #484848;
  font-weight: bold;
`;

export const RadioButtonItemDescription = styled.p`
  font-size: 13px;
  line-height: 22px;
  color: #9c9c9c;
`;
