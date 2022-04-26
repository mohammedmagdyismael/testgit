import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner, NewButton } from '@vezeeta/web-components';
import { getAppointmentInvoice } from '@vezeeta/enterprise-store/lib/actions/appointments';
import { getBranchDetails } from '@vezeeta/enterprise-store/lib/actions/clinics';
import { status, accountTypes } from '@vezeeta/enterprise-utils/lib/enum';
import ErrorImg from './error.png';
import { translation } from './localization/translation';
import IconsStore from './IconsStore';
import {
  ModalContainer,
  InnerPopupContainer,
  IconContainer,
  HeaderTitle,
  PopUpHeader,
  CloseLink,
  Container,
  SaveButton,
  ButtonContainer,
  CloseIcon,
  StatusContainer,
  StatusContainerWrapper,
  ErrorImage,
  ErrorMessage,
  ErrorMessageContainer,
  InnerContainer,
  extendRefreshButton,
} from './PrintInvoiceForm.styles';
import InvoicePrintForm from './InvoiceForm';

const PrintForm = ({
  onCloseAction,
  language,
  showModal,
  printInvoiceModal,
  appointmentInvoiceDetailsStatus,
  branchDetailsLoadStatus,
  branchDetails,
  appointmentInvoiceDetails,
  countries,
  user,
  entityImages,
  source,
  mixpanel,
  doctors,
  insurances,
  userType,
  branches,
  ...props
}) => {
  const localization = translation[language];

  const [numberOfTrialsOfCallingGetInvoice, setNumberOfTrialsOfCallingGetInvoice] = useState(0);
  const [localizedCurrency, setLocalizedCurrency] = useState('');
  const [invoiceItemsList, setInvoiceitems] = useState([]);
  const [invoiceSummary, setInvoiceSummary] = useState({
    subTotal: 0,
    discount: 0,
    vat: 0,
    total: 0,
    invoiceNumber: '',
  });
  const [patientInfo, setPatientInfo] = useState({ patientName: '', patientPhoneNumber: '' });
  const [providerInfo, setProviderInfo] = useState({
    providerName: '',
    providerLogo: '',
    providerNumber: '',
    addressString: '',
    providerTaxId: '',
    providerCR: '',
  });

  // Get Local Currency Name
  if (user && countries && !localizedCurrency) {
    const selectedCountry = countries.find(country => country.ISOCode === user.CountryIsoCode);
    const countryCurrency =
      selectedCountry &&
      selectedCountry.CountryCourrencies.CurrencyModels.find(currency => currency.IsDefault);
    const languageId = 1;
    const localizedCurrencyModel = countryCurrency.LanguageItemModels.filter(
      model => model.LanguageId === languageId,
    );
    setLocalizedCurrency(localizedCurrencyModel[0].Name);
  }

  const getInvoiceDetails = (reservationKey, branchKey) => {
    if (reservationKey) {
      props.getAppointmentInvoice({
        reservationKey,
      });
      props.getBranchDetails(branchKey);
    }
  };

  useEffect(() => {
    if (branchDetailsLoadStatus === status.SUCCESS) {
      if (branchDetails && branchDetails.payload && branchDetails.payload.data) {
        const selectedCountry = countries.find(country => country.ISOCode === user.CountryIsoCode);
        const languageId = language === 'en' ? 1 : 2;
        const { PhoneNumber, Address } = branchDetails.payload.data;
        const { AddressName, Area } = Address;
        const { AreaName, CityName } = Area;

        const localizedAddressName = AddressName.filter(modal => modal.LanguageId === languageId);
        const localizedAreaName = AreaName.filter(modal => modal.LanguageId === languageId);
        const localizedCityName = CityName.filter(modal => modal.LanguageId === languageId);

        const addressStringList = [];
        if (localizedAddressName && localizedAddressName[0].Value) {
          addressStringList.push(localizedAddressName[0].Value);
        }
        if (localizedAreaName && localizedAreaName[0].Value) {
          addressStringList.push(localizedAreaName[0].Value);
        }
        if (localizedCityName && localizedCityName[0].Value) {
          addressStringList.push(localizedCityName[0].Value);
        }

        const addressString = addressStringList.join(language === 'en' ? ', ' : '، ');

        let providerNumber = '';

        if (selectedCountry) {
          const { Hotline, CountryCode } = selectedCountry;
          if (PhoneNumber) {
            if (PhoneNumber === Hotline) {
              providerNumber = PhoneNumber;
            } else if (PhoneNumber.charAt(0) === '0') {
              providerNumber = `${CountryCode} ${PhoneNumber.slice(1)}`;
            } else {
              providerNumber = `${CountryCode} ${PhoneNumber}`;
            }
          }
        }
        setProviderInfo({
          ...providerInfo,
          providerNumber,
          addressString,
        });
      }
    }
  }, [branchDetailsLoadStatus]);

  // Get Mapped Services Name
  useEffect(() => {
    const { printInvoiceDetails } = printInvoiceModal;
    const { reservationKey, branchKey } = printInvoiceDetails;
    if (
      (appointmentInvoiceDetailsStatus === status.FAIL ||
        branchDetailsLoadStatus === status.FAIL) &&
      numberOfTrialsOfCallingGetInvoice < 5
    ) {
      // try calling five time if failure
      getInvoiceDetails(reservationKey, branchKey);
      setNumberOfTrialsOfCallingGetInvoice(numberOfTrialsOfCallingGetInvoice + 1);
    }

    if (status.SUCCESS === appointmentInvoiceDetailsStatus) {
      if (appointmentInvoiceDetails && appointmentInvoiceDetails.payload) {
        const branchInfoObj = branches.filter(branch => branch.BranchKey === branchKey);
        let taxID = '';
        let crNumber = '';
        if (branchInfoObj && branchInfoObj[0]) {
          crNumber = branchInfoObj[0].CRNumber;
          taxID = branchInfoObj[0].TaxIdNumber;
        }

        const {
          payerNameMobileNumberCountryCode,
          payerNameMobileNumber,
          payerName,
          invoiceItmes,
          totalAmount,
          discountAmount,
          totalCashAmountAfterDiscount,
          invoiceNumber,
          doctorNameLanguageItems,
        } = appointmentInvoiceDetails.payload;
        const servicesList = [];
        const languageId = language === 'en' ? 1 : 2;

        const doctorName = doctorNameLanguageItems.filter(item => item.languageId === languageId);

        setProviderInfo({
          ...providerInfo,
          providerLogo: entityImages && entityImages[0] && entityImages[0].ImageUrl,
          providerName: doctorName && doctorName[0] && doctorName[0].value,
          providerTaxId: taxID,
          providerCR: crNumber,
        });

        let patientNumber;
        if (payerNameMobileNumber) {
          if (payerNameMobileNumber.charAt(0) === '0') {
            patientNumber = `${payerNameMobileNumberCountryCode} ${payerNameMobileNumber.slice(1)}`;
          } else {
            patientNumber = `${payerNameMobileNumberCountryCode} ${payerNameMobileNumber}`;
          }
        }

        setPatientInfo({
          patientName: payerName.default,
          patientPhoneNumber: patientNumber,
        });

        if (invoiceItmes && invoiceItmes.length) {
          invoiceItmes.forEach(item => {
            let serviceDescription = '';
            if (!item.itemName) {
              serviceDescription = localization[String(item.itemCategoryKey).toLowerCase()];
            } else {
              serviceDescription = item.itemName[language];
            }
            servicesList.push({
              description: serviceDescription,
              qty: item.itemQuantity,
              price: item.itemPrice,
              insuranceCoverge: item.inusranceCovered ? item.insuranceAmount : 0,
              amount: item.inusranceCovered
                ? item.itemPrice - item.insuranceAmount
                : item.itemPrice,
            });
          });
          setInvoiceSummary({
            subTotal: totalAmount,
            discount: discountAmount,
            vat: 0,
            total: totalCashAmountAfterDiscount,
            invoiceNumber,
          });
          setInvoiceitems(servicesList);
        }
      }
    }
  }, [appointmentInvoiceDetailsStatus]);

  useEffect(() => {
    // Get Invoice Details
    const { printInvoiceDetails } = printInvoiceModal;
    const { reservationKey, branchKey } = printInvoiceDetails;
    getInvoiceDetails(reservationKey, branchKey);
  }, [printInvoiceModal, showModal]);

  const trackOnClickPrint = () => {
    if (
      appointmentInvoiceDetails &&
      appointmentInvoiceDetails.payload &&
      branchDetails &&
      branchDetails.payload &&
      branchDetails.payload.data
    ) {
      const {
        totalCashAmountAfterDiscount,
        invoiceItmes,
        insuranceKey,
        operationKey,
        doctorKey,
        operationDate,
      } = appointmentInvoiceDetails.payload;
      const { printInvoiceDetails } = printInvoiceModal;
      const { component, appointmentType } = printInvoiceDetails;
      let doctorSpecialty = '';
      let doctorName = '';
      let doctorRoom = '';

      const doctorObj = doctors.filter(dr => dr.AccountKey === doctorKey);
      if (doctorObj && doctorObj[0]) {
        const { MainSpecialty, DoctorName, RoomKey } = doctorObj[0];
        doctorSpecialty = MainSpecialty && MainSpecialty.SpecialityNameEnglish;
        doctorName = DoctorName;
        doctorRoom = RoomKey;
      }

      const getInsuranceLocalizedName = () => {
        const insuranceProvider = insurances.filter(
          insuranceObj => insuranceObj.InsuranceKey === insuranceKey,
        );
        if (insuranceProvider && insuranceProvider[0]) {
          const languageId = 1;
          const { LanguageItemModels } = insuranceProvider[0];
          const localizedInsuranceInfo = LanguageItemModels.filter(
            model => model.LanguageId === languageId,
          );
          if (localizedInsuranceInfo && localizedInsuranceInfo[0]) {
            return localizedInsuranceInfo[0].Name;
          }
        }
        return '';
      };
      const { EntitySignUpTypeId } = user;
      mixpanel.track('Print_Invoice_Pop up', {
        'Account Type': EntitySignUpTypeId && accountTypes[EntitySignUpTypeId],
        'Invoice amount': totalCashAmountAfterDiscount,
        'Services Added': invoiceItmes,
        BookingType: appointmentType,
        Source: `${source}${component ? `/${component}` : ''}`,
        InsuranceName: getInsuranceLocalizedName(),
        'Type of user': userType,
        ReservationDate: operationDate && new Date(`${operationDate}Z`).toString('en'),
        ReservationTime:
          operationDate &&
          new Date(`${operationDate}Z`).toTimeString('en', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        ReservationKey: operationKey,
        ExaminationRoomKey: doctorRoom,
        DoctorName: doctorName,
        DoctorSpecialty: doctorSpecialty,
      });
    }
  };

  const printInvoice = () => {
    setTimeout(() => {
      if (window) {
        const mywindow = window.open();
        mywindow.document.write(
          '<html><head><link rel="stylesheet" href="https://fonts.vezeeta.com?family=SourceSansPro,TheSansArabic"><style>',
        );
        mywindow.document.write(
          'body{width:595px;margin:0 auto;padding:32px}.container{display:flex;flex-direction:column;margin:0 auto;justify-content:space-between;width:595px;height:800px;padding:32px}.details-container{display:flex;flex-direction:row;justify-content:space-between;margin-bottom:40px}.details{display:flex;flex-direction:column;width:50%}.details2{display:flex;flex-direction:column;width:25%}.bold-title{font-weight:700;font-size:11px;line-height:18px;align-items:center;text-align:center;color:#000;text-align:left;margin:0;font-family:sans-serif}.light-detail{font-size:11px;line-height:15px!important;align-items:center;display:flex;text-align:center;color:#000;text-align:left;margin:0;font-family:sans-serif}.table-first-item{text-align:left;line-height:33px}.table-middle-item{text-align:left;line-height:38px}.table-last-item{text-align:right;line-height:33px}.col0{width:234px}.col1{width:44px}.col2{width:86px}.col3{width:90px}.col4{width:61px;justify-content:flex-end}.table-header{display:flex;justify-content:space-between}.bold-separator{border:2px solid;border-width:2px 0 0 0}.table-row{display:flex;justify-content:space-between;height:fit-content;min-height:38px;border:1px solid #e3e6ea;border-width:0 0 1px 0}.summary-container{display:flex;justify-content:flex-end;padding-top:12px}.summary-wrapper{width:46%}.summary-item{display:flex;flex-direction:row;justify-content:space-between;margin-bottom:4px}.bold-title-big{font-weight:700;font-size:14px;line-height:24px;align-items:center;text-align:center;color:#000;text-align:left;margin:0;font-family:sans-serif}.total-item{margin-top:8px}.bold-invoice-title{font-family:sans-serif;font-style:normal;font-weight:400;font-size:36px;line-height:28px;display:flex;align-items:center;color:#000;margin:auto 0}.logo{width:80px}.footer{margin:0!important}.ar{font-family:TheSansArabic;text-align:right;direction:rtl;}.details-container-ar{direction:rtl;}.ar-phone{direction:ltr;justify-content:flex-end;}.vat{direction: ltr;}',
        );
        mywindow.document.write('</style>');
        mywindow.document.write('</head><body>');
        mywindow.document.write(document.getElementsByClassName('invoice')[0].innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close();
        mywindow.focus();
        mywindow.print();
      }
    }, 500);
  };

  const resetModalContentAfterSubmitting = () => {
    setNumberOfTrialsOfCallingGetInvoice(0);
    setLocalizedCurrency('');
    setInvoiceitems([]);
    setInvoiceSummary({
      subTotal: 0,
      discount: 0,
      vat: 0,
      total: 0,
      invoiceNumber: '',
    });
    setPatientInfo({ patientName: '', patientPhoneNumber: '' });
    setProviderInfo({
      providerName: '',
      providerLogo: '',
      providerNumber: '',
    });
  };

  const renderModalView = () => {
    if (
      appointmentInvoiceDetailsStatus === status.FETCHING ||
      branchDetailsLoadStatus === status.FETCHING ||
      appointmentInvoiceDetailsStatus === status.SHOULD_CALL_API ||
      branchDetailsLoadStatus === status.SHOULD_CALL_API
    ) {
      return (
        <StatusContainer>
          <StatusContainerWrapper>
            <Spinner radius={100} />
          </StatusContainerWrapper>
        </StatusContainer>
      );
    } else if (
      (appointmentInvoiceDetailsStatus === status.FAIL ||
        branchDetailsLoadStatus === status.FAIL) &&
      numberOfTrialsOfCallingGetInvoice === 5
    ) {
      return (
        <StatusContainer>
          <StatusContainerWrapper>
            <ErrorImage src={ErrorImg} alt="" />
            <ErrorMessageContainer>
              <ErrorMessage>{localization.somethingWentWrong}</ErrorMessage>
              <NewButton
                btnText={localization.tryAgain}
                onClick={() => {
                  const { printInvoiceDetails } = printInvoiceModal;
                  const { reservationKey, branchKey } = printInvoiceDetails;
                  getInvoiceDetails(reservationKey, branchKey);
                }}
                iconName="refresh"
                extendButtonStyle={extendRefreshButton}
                iconColor="#484848"
              />
            </ErrorMessageContainer>
          </StatusContainerWrapper>
        </StatusContainer>
      );
    } else if (
      (appointmentInvoiceDetailsStatus === status.FAIL ||
        branchDetailsLoadStatus === status.FAIL) &&
      numberOfTrialsOfCallingGetInvoice < 5
    ) {
      return (
        <StatusContainer>
          <StatusContainerWrapper>
            <Spinner radius={100} />
          </StatusContainerWrapper>
        </StatusContainer>
      );
    } else if (
      appointmentInvoiceDetailsStatus === status.SUCCESS &&
      branchDetailsLoadStatus === status.SUCCESS
    ) {
      return (
        <div style={{ width: '100%', height: '86%' }}>
          <Container>
            <InnerContainer>
              <InvoicePrintForm
                localization={localization}
                language={language}
                printInvoiceDetails={{
                  PatientName: patientInfo.patientName,
                  reservationDate: new Date()
                    .toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' })
                    .replaceAll('/', '.'),
                  patientMobileNumber: patientInfo.patientPhoneNumber,
                  localizedCurrency,
                  invoiceItemsList,
                  invoiceSummary,
                  providerInfo,
                  providerName:
                    language === 'en'
                      ? user && user.EntityName
                      : user && (user.EntityNameArabic ? user.EntityNameArabic : user.EntityName),
                  addressString: providerInfo.addressString,
                  taxID: providerInfo.providerTaxId,
                  crNumber: providerInfo.providerCR,
                }}
              />
            </InnerContainer>
          </Container>
          <ButtonContainer>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SaveButton
                  onClick={() => {
                    trackOnClickPrint();
                    printInvoice();
                  }}
                >
                  <p>{localization.print}</p>
                </SaveButton>
              </div>
            </div>
          </ButtonContainer>
        </div>
      );
    }
    return '';
  };

  return (
    <div>
      <ModalContainer isModalShowed={showModal}>
        <InnerPopupContainer language={language}>
          <PopUpHeader>
            <HeaderTitle>{localization.invoice}</HeaderTitle>
            <IconContainer>
              <CloseLink
                onClick={() => {
                  onCloseAction(false);
                  resetModalContentAfterSubmitting();
                }}
              >
                <CloseIcon icon={IconsStore.getIcon('close')} width={12} color="#ffff" />
              </CloseLink>
            </IconContainer>
          </PopUpHeader>
          {renderModalView()}
        </InnerPopupContainer>
      </ModalContainer>
    </div>
  );
};

const mapStateToProps = state => ({
  printInvoiceModal: state.appointments.printInvoiceModal,
  appointmentInvoiceDetailsStatus: state.appointments.appointmentInvoiceDetailsStatus,
  appointmentInvoiceDetails: state.appointments.appointmentInvoiceDetails,
  countries: state.country.Countries,
  user: state.user.user,
  entityImages: state.clinics.entityImages,
  branchDetailsLoadStatus: state.clinics.branchDetailsLoadStatus,
  branchDetails: state.clinics.branchDetails,
  doctors: state.clinics.doctors,
  insurances: state.insurances.insurances,
  branches: state.clinics.branches,
});

PrintForm.propTypes = {
  branches: PropTypes.array,
  doctors: PropTypes.array,
  insurances: PropTypes.array,
  onCloseAction: PropTypes.func,
  language: PropTypes.string,
  localization: PropTypes.object,
  showModal: PropTypes.bool,
  printInvoiceModal: PropTypes.object,
  getAppointmentInvoice: PropTypes.func,
  appointmentInvoiceDetailsStatus: PropTypes.string,
  appointmentInvoiceDetails: PropTypes.object,
  user: PropTypes.object,
  countries: PropTypes.array,
  entityImages: PropTypes.array,
  getBranchDetails: PropTypes.func,
  branchDetailsLoadStatus: PropTypes.string,
  branchDetails: PropTypes.object,
  source: PropTypes.string,
  mixpanel: PropTypes.object,
  userType: PropTypes.string,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAppointmentInvoice,
      getBranchDetails,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PrintForm);
