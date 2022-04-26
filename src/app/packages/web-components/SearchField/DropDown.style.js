import styled from 'styled-components';

export const FieldContainer = styled.div`
  background-color: ${props => (props.isDimmed ? '#f5f5f5 !important' : '#f1f4f6')};
  width: 100%;
  min-height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 7px 16px;
  // margin: 4px 0px;
  border-radius: 8px;
  border: ${props =>
    props.isValid ? '1px solid #e3e6ea !important' : '1px solid #db3226 !important'};
  cursor: ${props => (props.isDimmed ? 'unset !important' : 'pointer')};
  ${props => (props.extendDropDownStyle ? props.extendDropDownStyle : '')};
`;

export const LabelValueContainer = styled.div`
  width: 90%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FieldLabel = styled.div`
  color: #9c9c9c;
  width: 100%;
  font-size: ${props => (props.isValueSelected ? '12px' : '16px')};
  line-height: ${props => (props.isValueSelected ? '18px' : '40px')};
`;
export const FieldValue = styled.p`
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  color: #484848;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ListContainer = styled.div`
  position: absolute;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.16));
  background-color: #fff;
  width: 100%;
  z-index: 2;
  max-height: 210px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #9c9c9c;
    border-radius: 15px;
  }
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  ${props => (props.extendDropDownList ? props.extendDropDownList : '')};
`;
export const ListItem = styled.div`
  box-shadow: inset 0px -1px 0px #f1f4f6;
  padding: 8px 12px 8px 16px;
  font-size: 16px;
  line-height: 24px;
  cursor: ${props => (props.isMultipleSelection ? 'unset' : 'pointer')};
  ${props => (props.extendDropDownListItem ? props.extendDropDownListItem : '')};
`;
export const ItemLabel = styled.p`
  color: #484848;
`;
export const ItemDescription = styled.p`
  font-size: 13px;
  line-height: 20px;
  color: #9c9c9c;
  direction: ${props => (props.language === 'ar' ? 'ltr' : 'unset')};
  text-align: ${props => (props.language === 'ar' ? 'right' : 'unset')};
`;

export const ItemContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  margin: 2% 0%;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: unset;
  font-size: 16px;
  line-height: 24px;
  &:focus {
    outline: none;
  }
`;

export const IsRequiredNote = styled.p`
  display: inline-flex;
  margin: 0px 3px;
  color: #db3226;
`;

export const DisableOverLay = styled.div`
  width: 100%;
  min-height: 100%;
  border: 1px solid #e3e6ea;
  border-radius: 8px;
  background-color: #f1f4f69c;
  position: absolute;
  display: ${props => (!props.isDisabled ? 'none' : 'block')};
`;
