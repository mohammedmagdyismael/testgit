import React from 'react';
import axios from 'axios';
import Parameter from './Parameter';
import OutBoundXML from './outbound.xml' ;
import { templates } from './xmlParamTemplates';
import { PlaceHolderBuilder } from './PlaceholderBuilder';
import { 
    Container, 
    Panel, 
    Panel2, 
    XMLCode, 
    Btn,
    ParametersContainer, 
    ParameterWrapper, 
    ParameterLabel, 
    FieldHeader,
     } from './XML.style';

class XML extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            xml: '', //# #document
            resultedTemplate: '',
            parameterFieldsList: null,
            selectedParam: null,
            selectedParamIdx : null,
            newParam: true,
            requestBody: null,
        }
    }

    updateXML = (e, idx) => {
        const { xml } = this.state;
        let targetedParam = Array.from(xml.getElementsByTagName("ListOfParameters")[0].getElementsByTagName("Parameter"))[idx];
        targetedParam.getElementsByTagName("PlaceHolder")[0].textContent = e.target.value;
        Array.from(xml.getElementsByTagName("ListOfParameters")[0].getElementsByTagName("Parameter"))[idx] = targetedParam;
        this.setState({xml});
    }

    xmlFileParser = data => {
        let parser = new DOMParser();
        return parser.parseFromString(data, "text/xml");
    }

    print = () => {
        /* const { xml } = this.state;
        var s = new XMLSerializer();
        var newXmlStr = s.serializeToString(xml);
        console.log(newXmlStr); */
         

        console.log(this.paramName.current.value);
    }

    addTemplate = () => {
        const { selectedItem, parameterFieldsList, xml } = this.state;
        let template = this.xmlFileParser(templates[selectedItem]);
        
        Array.from(template.getElementsByTagName("Parameter")).map( (param, idx) => {
            parameterFieldsList.push(
            <div>
                <p>
                    {Array.from(param.getElementsByTagName("Description"))[0].innerHTML}
                </p>
                <input onChange={e => this.updateXML(e, parameterFieldsList.length - 1)}/>
            </div>)
        })
        xml.getElementsByTagName("ListOfParameters")[0].appendChild(template.documentElement)

        this.setState({parameterFieldsList, xml});
    }

    componentDidMount(){
        axios.get(OutBoundXML, {
            "Content-Type": "application/xml; charset=utf-8"
         })
         .then((response) => {
            let xml = this.xmlFileParser(response.data);
            const outboundBody = xml.getElementsByTagName("OutboundBody")[0];
            const listOfPlaceHolders = outboundBody.getElementsByTagName("ListOfPlaceHolders")[0].getElementsByTagName("PlaceHolder");
 
            const listOfPlaceHoldersObjects = [];
            Array.from(listOfPlaceHolders).forEach(element => {
                listOfPlaceHoldersObjects.push(this.xmlToObjectConverter(element))
            });
            listOfPlaceHoldersObjects.forEach((obj, idx) => {
                let placeholder = new PlaceHolderBuilder();
                if (obj.PlaceHolder) {
                    if (obj.PlaceHolder.PlaceHolderName) {
                        const { tagName, tagInnerContent } = obj.PlaceHolder.PlaceHolderName;
                        placeholder.setPlaceHolderName(tagName, tagInnerContent);
                    }
                    if (obj.PlaceHolder.Description) {
                        const { tagName, tagInnerContent } = obj.PlaceHolder.Description;
                        placeholder.setDescription(tagName, tagInnerContent);
                    }
                    if (obj.PlaceHolder.Source) {
                        const { Source } = obj.PlaceHolder;
                        if (Source.ConfigKey) {
                            const { tagName, tagInnerContent} = Source.ConfigKey;
                            placeholder.setSourceConfigKey(tagName, tagInnerContent);
                        }
                        if (Source.DataModel) {
                            const { tagName, tagInnerContent} = Source.DataModel.Path;
                            placeholder.setSourceDataModel(tagName, tagInnerContent);
                        }

                        if (Source.DefaultValue) {
                            const { tagName, tagInnerContent} = Source.DefaultValue;
                            placeholder.setSourceDefaultSource(tagName, tagInnerContent);
                        }

                        if (Source.Utility) {
                            const { tagName, tagInnerContent} = Source.Utility.UtilName;
                            placeholder.setUtilityUtilName(tagName, tagInnerContent);
                            
                            if (Source.Utility.ListOfUtilParams && Source.Utility.ListOfUtilParams.length) {
                                
                                Source.Utility.ListOfUtilParams.forEach(param => {
 
                                    if(param.UtilParam && param.UtilParam.Name) {
                                        const { tagName, tagInnerContent} = param.UtilParam.Name;
                                        placeholder.setUtilParamName(tagName, tagInnerContent);
                                    }
                                    
                                    if(param.UtilParam && param.UtilParam.Source && param.UtilParam.Source.ConfigKey) {
                                        const { tagName, tagInnerContent} =  param.UtilParam.Source.ConfigKey;
                                        placeholder.setUtilParamSourceConfigkey(tagName, tagInnerContent);
                                    }

                                    if(param.UtilParam && param.UtilParam.Source && param.UtilParam.Source.StaticValue) {
                                        const { tagName, tagInnerContent} =  param.UtilParam.Source.StaticValue;
                                        placeholder.setUtilParamSourceStaticValue(tagName, tagInnerContent);
                                    }

                                    if(param.UtilParam && param.UtilParam.Source && param.UtilParam.Source.DataModel && param.UtilParam.Source.DataModel.Path) {
                                        const { tagName, tagInnerContent} =  param.UtilParam.Source.DataModel.Path;
                                        placeholder.setUtilParamSourceDataModel(tagName, tagInnerContent);
                                    }

                                     placeholder.addUtilParam();
                                });
                            }
                        }
                    }
                    listOfPlaceHoldersObjects[idx] = placeholder;
                }
                 
                
            })
            

            this.setState({ 
                parameterFieldsList: listOfPlaceHoldersObjects,
                xml, 
                requestBody: outboundBody.getElementsByTagName("Body")[0].innerHTML,
            });
         });
    }


    xmlToObjectConverter = xmlElement  => {
        if (!xmlElement) return;
        const nodesList = Array.from(xmlElement.childNodes).filter(node => node.nodeName !== "#text");
         
        if (nodesList.length === 0) {
            const { tagName, textContent } = xmlElement;
            let obj = {};
            obj[tagName] = {
                tagName: tagName,
                tagInnerContent: textContent,
            };
            return obj;
        } 
        let object = {};
        if (nodesList.length > 0) {
            object[xmlElement.tagName] = xmlElement.tagName === 'ListOfUtilParams' ? [] : {};
            
            for (let i = 0; i <= nodesList.length; i++) {
                if(nodesList[i]) {
                    let result = this.xmlToObjectConverter(nodesList[i])
                    if(xmlElement.tagName === 'ListOfUtilParams') {
                        object[xmlElement.tagName].push(result);
                    } else {    
                        object[xmlElement.tagName] = Object.assign(object[xmlElement.tagName], result);
                    }
                }
            }
        }
        
        return object;
    }

    OnSelect = e => {
        this.setState({selectedItem: e.target.value})
    }

    onSelectParam = (idx) => {
        const { parameterFieldsList } = this.state;
        this.setState({
            selectedParamIdx: idx, 
            selectedParam: parameterFieldsList[idx],
            newParam: false,
        })
    }

    renderParamtersList = () => {
        const { parameterFieldsList, selectedParamIdx } = this.state;
        return parameterFieldsList.map((param,idx) => {
            return (
                <ParameterWrapper isSelected={selectedParamIdx === idx} onClick={() => this.onSelectParam(idx)}>
                    <ParameterLabel>
                        param.: {param.placeHolderName.PlaceHolderName.tagInnerContent}
                    </ParameterLabel>
                </ParameterWrapper>
            )
        });
    }
    removePlaceholder = () => {
        const { selectedParamIdx, parameterFieldsList } = this.state;
        parameterFieldsList.splice(selectedParamIdx, 1);
        this.setState({
            parameterFieldsList,
            selectedParam: null,
            selectedParamIdx: null,
            newParam: true,

        })
    }

    addNewPlaceholder = () => {
        let placeholder = new PlaceHolderBuilder();
        this.setState({
            selectedParam: placeholder,
            selectedParamIdx : null,
            newParam: true,
        })
    }

    onFieldChanges = selectedParam => {
        this.setState({selectedParam});
    }

    onSavePlaceholder = () => {}

    render(){
        const { selectedParam, requestBody, parameterFieldsList, selectedParamIdx, newParam } = this.state; 

        return( 
            <Container>
                <Panel>
                    <XMLCode>
                         <Parameter 
                            selectedParam={selectedParam} 
                            selectedParamIdx={selectedParamIdx} 
                            onClickAdd={this.addNewPlaceholder}
                            onClickRemove={this.removePlaceholder}
                            onFieldChanges={this.onFieldChanges}
                            newParam={newParam}
                            />
                    </XMLCode> 

                    <FieldHeader>Request body:</FieldHeader>
                    <textarea id="requestBody" name="requestBody" rows="14" cols="102" value={requestBody}/> 

                    <Btn onClick={()=>this.print()}>
                        <p>Submit template</p>
                    </Btn>
                </Panel>
                <Panel2>
                    <p>List Of Parameters</p>
                    <ParametersContainer>
                        {parameterFieldsList && this.renderParamtersList()}
                    </ParametersContainer>
                </Panel2>
            </Container>
         )
    }
}
export default XML;