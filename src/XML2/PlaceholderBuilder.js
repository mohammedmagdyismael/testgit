export class PlaceHolderBuilder {
    constructor(){
        // PlaceHolder
        this.placeHolder = {};
        // PlaceHolderName
        this.placeHolderName = {
            PlaceHolderName:{
                    tagInnerContent: '',
                    tagName: ''
                }
        };
        // Description
        this.description = {
            Description:{
                    tagInnerContent: '',
                    tagName: ''
                }
        };
        // UtilParam
        this.utilParam = {
            UtilParam: {
                Name: {
                    tagInnerContent: '',
                    tagName: ''
                },
                Source: {
                    ConfigKey: {
                        tagInnerContent: '',
                        tagName: ''
                    },
                    DataModel: {
                        Path: {
                            tagInnerContent: '',
                            tagName: ''
                        }
                    },
                    StaticValue: {
                        tagInnerContent: '',
                        tagName: ''
                    }
                }
                
            }
        }
        this.utilParamEmpty = {
            UtilParam: {
                Name: {
                    tagInnerContent: '',
                    tagName: ''
                },
                Source: {
                    ConfigKey: {
                        tagInnerContent: '',
                        tagName: ''
                    },
                    DataModel: {
                        Path: {
                            tagInnerContent: '',
                            tagName: ''
                        }
                    },
                    StaticValue: {
                        tagInnerContent: '',
                        tagName: ''
                    }
                }
                
            }
        }
        // Source
        this.source = {
            Source: {
                ConfigKey: {
                    tagInnerContent: '',
                    tagName: ''
                },
                DataModel: {
                    Path: {
                        tagInnerContent: '',
                        tagName: ''
                    }
                },
                Utility: {
                    UtilName: {
                        tagInnerContent: '',
                        tagName: ''
                    },
                    ListOfUtilParams: []
                },
                DefaultSource: {
                    tagInnerContent: '',
                    tagName: ''
                },
            }
        }
    }

    setPlaceHolderName = (tagName, tagInnerContent) => {
        this.placeHolderName.PlaceHolderName.tagInnerContent = tagInnerContent;
        this.placeHolderName.PlaceHolderName.tagName = tagName;
        return this;
    }

    setDescription = (tagName, tagInnerContent) => {
        this.description.Description.tagInnerContent = tagInnerContent;
        this.description.Description.tagName = tagName;
        return this;
    }

    setSourceConfigKey = (tagName, tagInnerContent) => {
        this.source.Source.ConfigKey.tagInnerContent = tagInnerContent;
        this.source.Source.ConfigKey.tagName = tagName;
        return this;
    }

    setSourceDataModel = (tagName, tagInnerContent) => {
        this.source.Source.DataModel.Path.tagInnerContent = tagInnerContent;
        this.source.Source.DataModel.Path.tagName = tagName;
        return this;
    }

    setSourceDefaultSource = (tagName, tagInnerContent) => {
        this.source.Source.DefaultSource.tagInnerContent = tagInnerContent;
        this.source.Source.DefaultSource.tagName = tagName;
        return this;
    }

    setUtilityUtilName = (tagName, tagInnerContent) => {
        this.source.Source.Utility.UtilName.tagInnerContent = tagInnerContent;
        this.source.Source.Utility.UtilName.tagName = tagName;
        return this;
    }

    setUtilParamName = (tagName, tagInnerContent, idx) => {
        if(idx > -1) {
            this.source.Source.Utility.ListOfUtilParams[idx].UtilParam.Name.tagInnerContent = tagInnerContent;
        } else {
            this.utilParam.UtilParam.Name.tagInnerContent = tagInnerContent;
            this.utilParam.UtilParam.Name.tagName = tagName;
        }
        return this;
    }

    setUtilParamSourceStaticValue = (tagName, tagInnerContent, idx) => {
        if(idx > -1) {
            this.source.Source.Utility.ListOfUtilParams[idx].UtilParam.Source.StaticValue.tagInnerContent = tagInnerContent;
        } else {
            this.utilParam.UtilParam.Source.StaticValue.tagInnerContent = tagInnerContent;
            this.utilParam.UtilParam.Source.StaticValue.tagName = tagName;
        }
        return this;
    }

    setUtilParamSourceConfigkey = (tagName, tagInnerContent, idx) => {
        if(idx) {
            this.source.Source.Utility.ListOfUtilParams[idx].UtilParam.Source.ConfigKey.tagInnerContent = tagInnerContent;
        } else {
            this.utilParam.UtilParam.Source.ConfigKey.tagInnerContent = tagInnerContent;
            this.utilParam.UtilParam.Source.ConfigKey.tagName = tagName;
        }
        return this;
    }

    setUtilParamSourceDataModel = (tagName, tagInnerContent, idx) => {
        if(idx > -1) {
            this.source.Source.Utility.ListOfUtilParams[idx].UtilParam.Source.DataModel.Path.tagInnerContent = tagInnerContent;
        } else {
            this.utilParam.UtilParam.Source.DataModel.Path.tagInnerContent = tagInnerContent;
            this.utilParam.UtilParam.Source.DataModel.Path.tagName = tagName;
        }
        return this;
    }

    addUtilParam = () => {
        this.source.Source.Utility.ListOfUtilParams.push(JSON.parse(JSON.stringify(this.utilParam)));
        return this;
    }
    addEmptyUtilParam = () => {
        this.source.Source.Utility.ListOfUtilParams.push(JSON.parse(JSON.stringify(this.utilParamEmpty)));
        return this;
    }

    removeUtilParam = idx => {
        this.source.Source.Utility.ListOfUtilParams.splice(idx, 1);
        return this;
    }

    getPlaceHolder = () => {
        const PlaceHolderName = this.placeHolderName;
        const Description = this.description;
        const Source = this.source;
        this.placeHolder = {
            PlaceHolder: {
                ...PlaceHolderName,
                ...Description,
                ...Source
            }
        }
        return this.placeHolder;
    }
}
