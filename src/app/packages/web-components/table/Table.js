/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import withDisplayName from '../WithDisplayName';
import './Table.scss';

const Table = ({ className, ...props }) => (
  <ReactTable className={ClassNames('table--container', className)} {...props} />
);

Table.propTypes = {
  className: PropTypes.string,
};

export default withDisplayName(Table, 'Table');
