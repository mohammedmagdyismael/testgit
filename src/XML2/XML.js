import React from 'react';
import axios from 'axios';
import OutBoundXML from './outbound.xml' ;
import { templatesLabels, templates } from './xmlParamTemplates';
import { Container, Panel, XMLCode, Btn, Wrapper, AddBtn } from './XML.style';

class XML extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            xml: '', //# #document
            resultedTemplate: '',
            parameterFieldsList: [],
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
        const { xml } = this.state;
        var s = new XMLSerializer();
        var newXmlStr = s.serializeToString(xml);
        console.log(newXmlStr);
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
            this.setState({ xml });
         });
    }

    OnSelect = e => {
        this.setState({selectedItem: e.target.value})
    }

    render(){
        const { parameterFieldsList } = this.state; 
        return( 
            <Container>
                <Panel>
                    <Wrapper>
                        <select onChange={this.OnSelect} name="templates">
                            <option value=''></option>
                            {templatesLabels.map((template, idx) =>  <option value={idx}>{template}</option>)}
                        </select>
                        <AddBtn onClick={()=>this.addTemplate()}>
                            <p>Add</p>
                        </AddBtn>
                    </Wrapper>
                    <XMLCode>
                        {parameterFieldsList}
                    </XMLCode> 
                    <Btn onClick={()=>this.print()}>
                        <p>Submit template</p>
                    </Btn>
                </Panel>
            </Container>
         )
    }
}
export default XML;