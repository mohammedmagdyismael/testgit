import styled, { css } from 'styled-components';

export const DropDownContainer = styled.div`
  border: 1px solid #a9aaac;
  padding: 4px 0px;
  height: 44px;
  border-radius: 5px;
  width: 235px;
`;

export const DropDownWithCheckboxContainer = styled.div`
  width: 235px;
  position: relative;
`;

export const DropDownWithCheckbox = styled(DropDownContainer)`
  display: flex; 
  justify-content: space-between;
  padding: 4px 15px;
`;

export const DropDownWithCheckboxTitle = styled.p`
  font-size: 13px;
  color: #58595b;
  padding: 8px 0px;
`;
export const DropDownWithCheckboxIcon = styled.div`
  padding: 6px 5px;
`;

export const DropDownWithCheckboxListContainer = styled.div`
  display: ${props => (props.showCheckBoxMenuList ? 'block' : 'none')};
  border: 1px solid rgba(224, 224, 224, 0.4);
  box-shadow: 0 2px 2px rgba(224, 224, 224, 0.4);
  z-index: 5;
  padding: 13px 17px;
  position: absolute;
  background-color: #fff;
  width: 100%;
`;

export const ExtendInputContainer = css`
  padding: 0px 15px !important;
`;

export const ExtendComboboxMenuList = css`
  margin-top: 5px !important;
`;
