import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from '../buttons/Button';
import { COLORS } from '../base/Colors';
import withDisplayName from '../WithDisplayName';

class Pagination extends Component {
  state = { pageNumber: 0 };

  onClick = () => {
    this.setState(
      {
        pageNumber: (this.state.pageNumber += 1),
      },
      () => {
        if (this.props.onClick) {
          this.props.onClick(this.state.pageNumber);
        }
      },
    );
  };

  render() {
    return (
      <Fragment>
        {this.props.children}
        {!this.props.disable && (
          <div className="center">
            <Button
              className={classnames('btn--transparent', this.props.buttonClassName)}
              onClick={this.onClick}
              isLoading={this.props.isLoading}
              loadingText={this.props.loadingText}
              primary={false}
              color={COLORS.PRIMARY_BLUE}
            >
              {this.props.defaultText}
            </Button>
          </div>
        )}
      </Fragment>
    );
  }
}

Pagination.propTypes = {
  children: PropTypes.element.isRequired,
  defaultText: PropTypes.string,
  loadingText: PropTypes.string,
  buttonClassName: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  disable: PropTypes.bool,
};

Pagination.defaultProps = {
  defaultText: 'Load more',
  loadingText: 'Loading...',
  disable: false,
  buttonClassName: undefined,
  onClick: () => {},
  isLoading: false,
};

export default withDisplayName(Pagination, 'Pagination');
