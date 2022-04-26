/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  direction: ${props => (props.language === 'en' ? 'unset' : 'ltr')};
  .container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    justify-content: space-between;
    width: 595px;
    padding: 32px;
  }
  .details-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  .details {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  .details2 {
    display: flex;
    flex-direction: column;
    width: 25%;
  }
  .bold-title {
    font-weight: bold;
    font-size: 11px;
    line-height: 18px;
    align-items: center;
    text-align: center;
    color: #000000;
    text-align: left;
    margin: 0;
    font-family: sans-serif;
  }
  .light-detail {
    font-size: 11px;
    line-height: 15px !important;
    align-items: center;
    display: flex;
    text-align: center;
    color: #000000;
    text-align: left;
    margin: 0;
    font-family: sans-serif;
  }

  .table-first-item {
    text-align: left;
    line-height: 33px;
  }
  .table-middle-item {
    text-align: left;
    line-height: 38px;
  }
  .table-last-item {
    text-align: right;
    line-height: 33px;
  }
  .col0 {
    width: 234px;
  }
  .col1 {
    width: 44px;
  }
  .col2 {
    width: 86px;
  }
  .col3 {
    width: 90px;
  }
  .col4 {
    width: 61px;
    justify-content: flex-end;
  }

  .table-container {
    margin-bottom: 100px;
  }
  .table-header {
    display: flex;
    justify-content: space-between;
  }
  .bold-separator {
    border: 2px solid;
    border-width: 2px 0px 0px 0px;
  }
  .table-row {
    display: flex;
    justify-content: space-between;
    height: fit-content;
    min-height: 38px;
    border: 1px solid #e3e6ea;
    border-width: 0px 0px 1px 0px;
  }
  .summary-container {
    display: flex;
    justify-content: flex-end;
    padding-top: 12px;
  }
  .summary-wrapper {
    width: 46%;
  }
  .summary-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  .bold-title-big {
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    align-items: center;
    text-align: center;
    color: #000000;
    text-align: left;
    margin: 0;
    font-family: sans-serif;
  }
  .total-item {
    margin-top: 8px;
  }
  .bold-invoice-title {
    font-family: sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 28px;
    display: flex;
    align-items: center;
    color: #000000;
    margin: auto 0;
  }
  .logo {
    width: 80px;
  }
  .footer {
    margin: 0px !important;
  }
  .ar {
    font-family: 'TheSansArabic' !important;
    text-align: right !important;
    direction: rtl;
  }
  .details-container-ar {
    direction: rtl;
  }
  .ar-phone {
    direction: ltr;
    justify-content: flex-end;
  }
`;
