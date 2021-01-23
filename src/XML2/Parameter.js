import React from 'react';
import { 
    FieldHeader,
    NewParameterContainer,
    ParameterNameContainer,
    InputField,
    AddTagBtn,
    BtnsContainer,
    ParametersFieldsContainer,
    BtnsContainerWrapper,
    Header,
    SubHeader,
    SubContainer,
    UtilContainer,
     } from './XML.style';

class Parameter extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    addNewPlaceholder = () => {};
    savePlaceholder = () => {};
    removePlaceholder = () => {
        const { onClickRemove } = this.props;
        onClickRemove();
    };

    render(){
        const { selectedParam, newParam, onClickAdd, onFieldChanges } = this.props; 

        const {
            Description = {}, 
            PlaceHolderName = {}, 
            Source = {}
        } = selectedParam ? selectedParam.getPlaceHolder().PlaceHolder : {};
        
        const {
            DataModel = {}, 
            DefaultSource = {}, 
            ConfigKey = {}, 
            Utility = {}, 
        } = Source ? Source : {};

        console.log(selectedParam)

        return(
             <NewParameterContainer>

                <Header>PlaceHolder</Header>  
                <ParametersFieldsContainer>
                {/**
                 * PlaceHolderName
                 */}
                <ParameterNameContainer>
                    <FieldHeader>PlaceHolderName</FieldHeader>
                    <InputField 
                        onChange={e=>{selectedParam.setPlaceHolderName(PlaceHolderName.tagName, e.target.value); onFieldChanges(selectedParam)}} 
                        value={PlaceHolderName && PlaceHolderName.tagInnerContent} />
                </ParameterNameContainer>

                {/**
                 * Description
                 */}
                <ParameterNameContainer>
                    <FieldHeader>Description</FieldHeader>
                    <InputField 
                        onChange={e=>{selectedParam.setDescription(Description.tagName, e.target.value); onFieldChanges(selectedParam)}} 
                        value={Description && Description.tagInnerContent} />
                </ParameterNameContainer>

                {/** Source **/}
                <SubHeader>Source</SubHeader>
                    <SubContainer>
                    {/**
                     * ConfigKey
                    */}
                    <ParameterNameContainer>
                        <FieldHeader>ConfigKey</FieldHeader>
                        <InputField 
                            onChange={e=>{selectedParam.setSourceConfigKey(ConfigKey.tagName, e.target.value); onFieldChanges(selectedParam)}} 
                            value={ConfigKey && ConfigKey.tagInnerContent} />
                    </ParameterNameContainer>

                    {/**
                     * DefaultSource
                    */}
                     
                    <ParameterNameContainer>
                        <FieldHeader>DefaultSource</FieldHeader>
                        <InputField 
                            onChange={e=>{selectedParam.setSourceDefaultSource(DefaultSource.tagName, e.target.value); onFieldChanges(selectedParam)}} 
                            value={DefaultSource && DefaultSource.tagInnerContent} />
                    </ParameterNameContainer>
                    

                    {/**
                     * DataModel
                    */}
                    <SubHeader>DataModel</SubHeader>
                    <SubContainer>
                        <ParameterNameContainer>
                            <FieldHeader>Path</FieldHeader>
                            <InputField 
                                onChange={e=>{selectedParam.setSourceDataModel(DataModel.Path.tagName, e.target.value); onFieldChanges(selectedParam)}}
                                value={DataModel && DataModel.Path && DataModel.Path.tagInnerContent} />
                        </ParameterNameContainer>
                    </SubContainer>

                    {/**
                     * Utility
                    */}
                    <SubHeader>Utility</SubHeader>
                        <SubContainer>
                            <ParameterNameContainer>
                                <FieldHeader>UtilName</FieldHeader>
                                <InputField 
                                    onChange={e=>{selectedParam.setUtilityUtilName(Utility.UtilName.tagName, e.target.value); onFieldChanges(selectedParam)}}
                                    value={Utility && Utility.UtilName && Utility.UtilName.tagInnerContent}/>
                            </ParameterNameContainer>

                            {   Utility.ListOfUtilParams &&
                                Utility.ListOfUtilParams.map((uParam, idx) => {
                                    return(
                                    <UtilContainer>
                                        <SubHeader>UtilParams</SubHeader>
                                        <ParameterNameContainer>
                                            <FieldHeader>Name</FieldHeader>
                                            <InputField 
                                                onChange={e=>{selectedParam.setUtilParamName(uParam.UtilParam.Name.tagName, e.target.value, idx); onFieldChanges(selectedParam)}}
                                                value={uParam.UtilParam.Name.tagInnerContent } />
                                        </ParameterNameContainer>

                                        <SubHeader>Source DataModel</SubHeader>
                                        <ParameterNameContainer>
                                            <FieldHeader>Path</FieldHeader>
                                            <InputField value={
                                                uParam.UtilParam.Source &&
                                                uParam.UtilParam.Source.DataModel &&
                                                uParam.UtilParam.Source.DataModel.Path.tagInnerContent }
                                                onChange={e=>{
                                                    selectedParam.setUtilParamSourceDataModel(uParam.UtilParam.Source.DataModel.Path.tagName, e.target.value, idx); 
                                                    onFieldChanges(selectedParam)
                                                }}
                                                />
                                        </ParameterNameContainer>
                                        <ParameterNameContainer>
                                            <FieldHeader>StaticValue</FieldHeader>
                                            <InputField value={
                                                uParam.UtilParam.Source &&
                                                uParam.UtilParam.Source.StaticValue &&
                                                uParam.UtilParam.Source.StaticValue.tagInnerContent }
                                                onChange={e=>{
                                                    selectedParam.setUtilParamSourceStaticValue(uParam.UtilParam.Source.StaticValue.tagName, e.target.value, idx); 
                                                    onFieldChanges(selectedParam)
                                                }}
                                                />
                                        </ParameterNameContainer>
                                        <ParameterNameContainer>
                                            <FieldHeader>ConfigKey</FieldHeader>
                                            <InputField value={
                                                uParam.UtilParam.Source &&
                                                uParam.UtilParam.Source.ConfigKey &&
                                                uParam.UtilParam.Source.ConfigKey.tagInnerContent }
                                                onChange={e=>{
                                                    selectedParam.setUtilParamSourceConfigkey(uParam.UtilParam.Source.ConfigKey.tagName, e.target.value, idx); 
                                                    onFieldChanges(selectedParam)
                                                }}
                                                />
                                        </ParameterNameContainer>
                                    </UtilContainer>
                                )})
                            }
                            
                            <AddTagBtn>Add Util Param</AddTagBtn>

                        </SubContainer>
                    </SubContainer>

                </ParametersFieldsContainer>  
                 
                <BtnsContainerWrapper>
                    <BtnsContainer>
                        {newParam && <AddTagBtn onClick={()=>onClickAdd()}>Add New Placeholder</AddTagBtn>}
                        {!newParam && <AddTagBtn>Save Placeholder</AddTagBtn>}
                        {!newParam && <AddTagBtn onClick={()=>this.removePlaceholder()}>Remove Placeholder</AddTagBtn>}
                    </BtnsContainer>
                </BtnsContainerWrapper> 
                
            </NewParameterContainer>
         )
    }
}
export default Parameter;