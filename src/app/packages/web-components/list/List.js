import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import _ from 'lodash';

import Separator from '../separator/Separator';
import withDisplayName from '../WithDisplayName';

let key = 0;
const getKey = () => {
  key += 1;
  return key;
};

class List extends Component {
  state = {
    list: [],
  };

  componentWillMount() {
    if (this.props.list) {
      this.renderList(this.props.list);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list && !_.isEqual(nextProps.list, this.props.list)) {
      this.setState(
        {
          list: [],
        },
        () => {
          this.renderList(nextProps.list);
        },
      );
    }
  }

  renderList = list => {
    const { onItemWillRender, customSeparatorCallback } = this.props;
    list.forEach(item => {
      let customSeparatorComponent;
      if (customSeparatorCallback) {
        customSeparatorComponent = customSeparatorCallback(item.callbackItems);

        if (!customSeparatorComponent) {
          customSeparatorComponent = <Fragment key={`custom-${getKey()}`} />;
        }
      }

      // Calling this.props.onItemWillRender to know which separator type will be rendered
      const separatorText = onItemWillRender(item.callbackItems);

      // Initialize components with keys
      const separatorComponent = (
        <Separator
          key={`divider-${getKey()}`}
          className={ClassNames(this.props.separatorClassName)}
          text={separatorText}
          my={5}
        />
      );
      const component = <Fragment key={`item-${getKey()}`}>{item.component}</Fragment>;

      // Pushing separator and component into this.state.list
      const newState = this.state.list;
      newState.push(customSeparatorComponent);
      newState.push(separatorComponent);
      newState.push(component);

      this.setState({
        list: newState,
      });
    });
  };

  render() {
    return <div className={ClassNames(this.props.className)}>{this.state.list}</div>;
  }
}

// Props docs here https://vezeeta-final.visualstudio.com/web-packages/_wiki/wikis/Vezeeta.Account.Web.wiki?wikiVersion=GBwikiMaster&pagePath=%2FWeb-components%2FList
List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.any,
      callbackItems: PropTypes.any,
    }),
  ).isRequired,
  onItemWillRender: PropTypes.func,
  customSeparatorCallback: PropTypes.func,
  className: PropTypes.string,
  separatorClassName: PropTypes.string,
};

List.defaultProps = {
  onItemWillRender: () => {},
  customSeparatorCallback: () => {},
  className: undefined,
  separatorClassName: undefined,
};

export default withDisplayName(List, 'List');
