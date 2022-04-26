import styled from 'styled-components'

export const Container = styled.div`
    font-family: sans-serif;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 85%;
    margin: 0 auto;
`;
export const Panel = styled.div`
    width: 75%;
`;

export const Panel2 = styled(Panel)`
    width: 25%;
`;

export const ParametersContainer = styled.div``;
export const ParameterWrapper = styled.div`
    background-color: ${props => props.isSelected ? '#015cac' : '#adadad'};
    color: #fff;
    padding: 4px 10px;
    font-size: 13px;
    border-radius: 5px;
    margin-bottom: 4px;
    cursor: pointer;
    &:hover{
        background-color: #015cac; 
    }
`;
export const ParameterLabel = styled.p`
    margin: 0px;
`;

export const FieldHeader = styled.p`
    margin-bottom: 5px;
    margin-top: 4px;
    margin-right: 6px;
    width: 110px;
`;

export const NewParameterContainer = styled.div`
    border: 1px solid #949494;
    border-radius: 5px;
    margin: 15px 0px;
    width: 85%;
    padding: 8px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
export const ParameterNameContainer = styled.div`
    display: flex;
    margin-bottom: 10px; 
    justify-content: space-between;
`;
export const InputField = styled.input`
    border-radius: 3px;
    border: 1px solid;
    width: 480px;
`;

export const XMLCode = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;
export const Btn = styled.div`
    width: 140px;
    text-align: center;
    padding: 1px 10px;
    background-color: #015cac;
    color: #fff;
    font-family: sans-serif;
    font-size: 14px;
    margin: 40px auto;
    cursor: pointer;

`;

export const AddTagBtn = styled(Btn)`
    margin: 0 0 0 auto;
    padding: 4px 10px;
    color: ${props => props.disabled ? 'darkgray' : '#015cac'};
    border: ${props => props.disabled ? '1px solid darkgray' : '#015cac'};;
    background-color:  #fff;
    border-radius: 3px;
    &:hover{
        color: ${props => !props.disabled ? 'darkgray' : '#fff'};
        border: 1px solid #fff;
        background-color: #015cac;
    }
`;

export const BtnsContainer = styled.div`
    display: flex;
    width: 500px;
    justify-content: space-between;
`;

export const AddBtn = styled(Btn) `
    margin: 0px 10px;
    width: 75px;
    padding: 1px 4px;
`;
export const Wrapper = styled.div`
    display: flex;
`;

export const ParametersFieldsContainer = styled(XMLCode)`
    margin-bottom: 20px;
    padding: 0px 20px;
    
 
    display: flex;
    flex-direction: column;
`;

export const BtnsContainerWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0px 20px;
`;

export const Header = styled.p`
    font-size: 16px;
    font-weight: 700;
`;

export const SubHeader = styled(Header)`
    font-size: 15px;
    margin: 0px 0px 8px;
`;

export const SubContainer = styled.div`
    padding-left: 20px;
`;

export const UtilContainer = styled(NewParameterContainer)`
    width: 97%;
`;