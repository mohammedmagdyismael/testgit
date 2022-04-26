import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './InvoiceForm.style';

const PrintInvoiceForm = ({ printInvoiceDetails, localization, language }) => {
  const {
    // Patient
    PatientName,
    reservationDate,
    patientMobileNumber,
    // Invoice
    invoiceItemsList,
    invoiceSummary,
    localizedCurrency,
    // Entity
    providerInfo,
    providerName,
    addressString,
    taxID,
    crNumber,
  } = printInvoiceDetails;

  const rountUpTo2Decimals = number => {
    if (number) return Math.round(number * 100) / 100;
    return 0;
  };

  return (
    <Wrapper language={language}>
      <div className="invoice">
        <div className="container">
          <div>
            <div className="details-container">
              <div className="details margin-title">
                {providerInfo.providerLogo ? (
                  <img className="logo" src={providerInfo.providerLogo} alt="entityLogo" />
                ) : (
                  ''
                )}
              </div>
              <div className="details2">
                <p className={`bold-invoice-title ${language === 'en' ? '' : 'ar'}`}>
                  {localization.invoice}
                </p>
              </div>
            </div>
            <div className={`details-container ${language === 'en' ? '' : 'details-container-ar'}`}>
              <div className="details">
                <p className={`bold-title ${language === 'en' ? '' : 'ar'}`}>
                  {localization.details}
                </p>
                <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>{providerName}</p>
                {invoiceSummary.invoiceNumber ? (
                  <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>
                    {localization.invoiceNo} {invoiceSummary.invoiceNumber}
                  </p>
                ) : (
                  ''
                )}
                {crNumber ? (
                  <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>
                    {localization.crNumber} {crNumber}
                  </p>
                ) : (
                  ''
                )}
                {taxID ? (
                  <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>
                    {localization.taxId} {taxID}
                  </p>
                ) : (
                  ''
                )}

                <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>
                  {localization.date} {reservationDate}
                </p>
              </div>
              <div className="details2 margin-title">
                <p className={`bold-title ${language === 'en' ? '' : 'ar'}`}>
                  {localization.billTo}
                </p>
                <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>{PatientName}</p>
                <p className={`light-detail ${language === 'en' ? '' : 'ar ar-phone'}`}>
                  {patientMobileNumber}
                </p>
              </div>
            </div>
            <div className={`table-container ${language === 'en' ? '' : 'details-container-ar'}`}>
              <div className="table-header">
                <p className={`bold-title table-first-item col0 ${language === 'en' ? '' : 'ar'}`}>
                  {localization.description}
                </p>
                <p className={`bold-title table-middle-item col1 ${language === 'en' ? '' : 'ar'}`}>
                  {localization.qty}
                </p>
                <p className={`bold-title table-middle-item col2 ${language === 'en' ? '' : 'ar'}`}>
                  {localization.price}
                </p>
                <p className={`bold-title table-middle-item col3 ${language === 'en' ? '' : 'ar'}`}>
                  {localization.insuranceCoverage}
                </p>
                <p className={`bold-title table-last-item col4 ${language === 'en' ? '' : 'ar'}`}>
                  {localization.amount}
                </p>
              </div>
              <div className="bold-separator" />
              {invoiceItemsList &&
                invoiceItemsList.length &&
                invoiceItemsList.map(item => (
                  <div className="table-row">
                    <p
                      className={`light-detail table-first-item col0 ${
                        language === 'en' ? '' : 'ar'
                      }`}
                    >
                      {item.description}
                    </p>
                    <p
                      className={`light-detail table-middle-item col1 ${
                        language === 'en' ? '' : 'ar'
                      }`}
                    >
                      {item.qty}
                    </p>
                    <p
                      className={`light-detail table-middle-item col2 ${
                        language === 'en' ? '' : 'ar'
                      }`}
                    >
                      {item.price} {localizedCurrency}
                    </p>
                    <p
                      className={`light-detail table-middle-item col3 ${
                        language === 'en' ? '' : 'ar'
                      }`}
                    >
                      {rountUpTo2Decimals(item.insuranceCoverge)} {localizedCurrency}
                    </p>
                    <p
                      className={`light-detail table-last-item col4 ${
                        language === 'en' ? '' : 'ar'
                      }`}
                    >
                      {rountUpTo2Decimals(item.amount)} {localizedCurrency}
                    </p>
                  </div>
                ))}
              <div className="bold-separator" />
              <div
                className={`summary-container ${language === 'en' ? '' : 'details-container-ar'}`}
              >
                <div className="summary-wrapper">
                  <div className="summary-item">
                    <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>
                      {localization.subTotal}
                    </p>
                    <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>
                      {rountUpTo2Decimals(invoiceSummary.subTotal)} {localizedCurrency}
                    </p>
                  </div>
                  <div className="summary-item">
                    <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>
                      {localization.discount}
                    </p>
                    <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>
                      {rountUpTo2Decimals(invoiceSummary.discount)} {localizedCurrency}
                    </p>
                  </div>
                  <div className="summary-item">
                    <p className={`light-detail ${language === 'en' ? '' : 'ar vat'}`}>
                      {localization.vat}
                    </p>
                    <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>
                      {rountUpTo2Decimals(invoiceSummary.vat)} {localizedCurrency}
                    </p>
                  </div>
                  <div className="summary-item total-item">
                    <p className={`bold-title-big ${language === 'en' ? '' : 'ar'}`}>
                      {localization.total}
                    </p>
                    <p className={`bold-title-big ${language === 'en' ? '' : 'ar'}`}>
                      {rountUpTo2Decimals(invoiceSummary.total)} {localizedCurrency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`details-container footer ${
              language === 'en' ? '' : 'details-container-ar'
            }`}
          >
            <div className="details">
              <p className={`bold-title ${language === 'en' ? '' : 'ar'}`}>
                {localization.contact}
              </p>
              {providerInfo.providerNumber ? (
                <p
                  className={`light-detail ${language === 'en' ? '' : 'ar ar-phone'}`}
                >{`${providerInfo.providerNumber}`}</p>
              ) : (
                ''
              )}
              {addressString ? (
                <p className={`light-detail ${language === 'en' ? '' : 'ar'}`}>{addressString}</p>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

PrintInvoiceForm.propTypes = {
  printInvoiceDetails: PropTypes.object,
  localization: PropTypes.object,
  language: PropTypes.string,
};

export default PrintInvoiceForm;
