const BaseUrls = {
  accountManagement: `${process.env.REACT_APP_ACCOUNT_URL}/api`,
  schedule: `${process.env.REACT_APP_SCHEDULE_API_URL}/api`,
  patients: `${process.env.REACT_APP_PATIENTS_URL}/api`,
  appointments: `${process.env.REACT_APP_APPOINTMENTS_URL}/api`,
  lookUps: `${process.env.REACT_APP_LOOK_UPS_URL}/api`,
  static: `${process.env.REACT_APP_STATIC_URL}/api`,
  payment: `${process.env.REACT_APP_PAYMENT_URL}/api`,
  vezeetaNative: `${process.env.REACT_APP_VEZEETA_NATIVE_URL}/api`,
  salesForce: `${process.env.REACT_APP_SALES_FORCE_URL}/api`,
  profile: `${process.env.REACT_APP_PROFILE_URL}/graphql`,
  offers: `${process.env.REACT_APP_SERVICES_URL}/api`,
  offersGateway: `${process.env.REACT_APP_GATAWAY_SERVICES_URL}/api`,
  aman: `${process.env.REACT_APP_AMAN_URL}/api`,
  prescription: `${process.env.REACT_APP_ACCOUNT_MANAGEMENT_GATEWAY}/prescription-api/api`,
  homeVisits: `${process.env.REACT_APP_HOMEVISITS_URL}/api`,
  crmGateWay: `${process.env.REACT_APP_CRM_GATEWAY}/api`,
  accountManagementAdsGateWay: `${process.env.REACT_APP_ACCOUNT_MANAGEMENT_GATEWAY}/ads-api/api`,
  accountManagementSOGateWay: `${process.env.REACT_APP_ACCOUNT_MANAGEMENT_GATEWAY}/so-api/api`,
  accountManagementInvoicesGateWay: `${
    process.env.REACT_APP_ACCOUNT_MANAGEMENT_GATEWAY
  }/billing-api/api`,
  accountManagementPaymentGateWay: `${
    process.env.REACT_APP_ACCOUNT_MANAGEMENT_GATEWAY
  }/payment-api/api`,
  accountManagementPatientsGateWay: `${
    process.env.REACT_APP_ACCOUNT_MANAGEMENT_GATEWAY
  }/patients-ms-api/api`,
  accountManagementAPIsGateWay: `${
    process.env.REACT_APP_ACCOUNT_MANAGEMENT_GATEWAY
  }/account-management-api/api`,
  accountManagementReservationGateWay: `${
    process.env.REACT_APP_ACCOUNT_MANAGEMENT_GATEWAY
  }/reservation-ms-api/api`,
  accountManagementScheduleMSGateWay: `${
    process.env.REACT_APP_ACCOUNT_MANAGEMENT_GATEWAY
  }/schedule-ms-api/api`,
  accountManagementEPharmaMSGateWay: `${
    process.env.REACT_APP_ACCOUNT_MANAGEMENT_GATEWAY
  }/epharmacy-invenotry-api/api`,
  accountManagementVDoctorCoreGateWay: `${
    process.env.REACT_APP_ACCOUNT_MANAGEMENT_GATEWAY
  }/v-doc-core-api/api`,
};

const Urls = {
  getEntity: `${BaseUrls.accountManagementSOGateWay}/entity-services`,
  getEntityVDoc: `${BaseUrls.accountManagementVDoctorCoreGateWay}/entities`,
  getServices: `${BaseUrls.accountManagementSOGateWay}/services`,
  getBranchDetails: `${BaseUrls.accountManagementVDoctorCoreGateWay}/branches`,
  getPreivouslyAddedItems: `${BaseUrls.prescription}/Eprescription/GetPreivouslyAddedItems`,
  getEPrescription: `${BaseUrls.prescription}/Eprescription/GetEPrescription`,
  upsertEPrescription: `${BaseUrls.prescription}/Eprescription/UpsertEPrescription`,
  getPrescriptionSettings: `${BaseUrls.prescription}/Eprescription/GetPrescriptionSettings`,
  pharmaProductShape: `${BaseUrls.accountManagementEPharmaMSGateWay}/V2/ProductShapes`,
  reservationSearch: `${BaseUrls.accountManagementReservationGateWay}/v2/reservations/search`,
  countReservationsInRange2: `${
    BaseUrls.accountManagementReservationGateWay
  }/Reservation/CountAllReservationsInRange2`,
  editAssistant: `${BaseUrls.accountManagementAPIsGateWay}/v2/Account/EditBasicInfo`,
  updateLoginStatus: `${BaseUrls.accountManagementAPIsGateWay}/Account/UpdateLoginStatus`,
  registerAccount: `${BaseUrls.accountManagementAPIsGateWay}/Account/RegisterAccount`,
  searchAccounts: `${BaseUrls.accountManagementAPIsGateWay}/Account/SearchAccounts`,
  editPatientDetails: `${BaseUrls.accountManagementPatientsGateWay}/patients/editPatient`,
  getPatientList: `${BaseUrls.accountManagementPatientsGateWay}/v2/patients/searchPatients`,
  getPatientInfo: `${BaseUrls.accountManagementPatientsGateWay}/v2/patients`,
  getAppointmentInvoice: `${BaseUrls.accountManagementInvoicesGateWay}/invoices/operationKey:`,
  getCultures: `${BaseUrls.lookUps}/Cultures`,
  getCities: `${BaseUrls.static}/City/GetCities`,
  getAreas: `${BaseUrls.static}/Area/GetAreas`,
  getCityAreaHv: `${BaseUrls.static}/Area/GetCitiesAreasByBookingType`,
  getbookingtypes: `${BaseUrls.static}/bookingtype/getbookingtypes`,
  // The _unsafe_ Urls below is old, and should not be used, instead use the safe urls above
  // This old Urls is kept here as a workaround to add a fix to accounts-web
  // once accounts-web is updated to use static base url, it should use "getCities", & "getAreas"
  // and unsfae urls should be removed
  getSpecialities: `${BaseUrls.lookUps}/Specialities`,
  GetPrefixTitlesByCategoryTypeKey: `${
    BaseUrls.static
  }/PrefixTitle/GetPrefixTitlesByCategoryTypeKey?`,
  getPrefixTitles: `${BaseUrls.static}/PrefixTitle/GetPrefixTitlesByCountryId?`,
  currencyConversion: `${BaseUrls.static}/Currency/GetCurrencyConversions`,
  getInsuranceProvidersByCountryId: `${
    BaseUrls.static
  }/Insurance/GetInsuranceProvidersByCountryId?countryId=`,
  getProfessionalTitles: `${BaseUrls.static}/DoctorTitle/GetDoctorTitlesByCountryId?`,

  getServicesAndChildServices: `${
    BaseUrls.accountManagementSOGateWay
  }/home/GetServicesAndChildServices`,
  getInsuranceServicesAndChildServices: `${
    BaseUrls.accountManagementSOGateWay
  }/service/GetInsuranceServicesAndChildServices`,
  getBillingInvoices: `${BaseUrls.accountManagementInvoicesGateWay}/invoices/query`,

  getPatientAppointmentsUrl: `${BaseUrls.schedule}api/Schedule/GetPatientReservations`,
  getReservationDetailsUrl: `${BaseUrls.schedule}api/Schedule/GetReservationDetails`,
  getConfirmationsUrl: `${BaseUrls.schedule}/Confirmations/GetWeeksConfirmations`,
  saveConfirmationsUrl: `${BaseUrls.schedule}/Confirmations/SetConfirmations`,
  getWorkingHours: `${BaseUrls.schedule}/WorkingHours/GetWorkingHours`,
  saveWorkingHours: `${BaseUrls.schedule}/WorkingHours/SaveWorkingHours`,
  getScheduleTypes: `${BaseUrls.schedule}/Schedule/getScheduleTypes`,
  setScheduleTypes: `${BaseUrls.schedule}/Schedule/setScheduleTypes`,
  getAllowReservationWindow: `${BaseUrls.schedule}/Schedule/getAllowReservationWindow`,
  setAllowReservationWindow: `${BaseUrls.schedule}/Schedule/setAllowReservationWindow`,
  getVacations: `${BaseUrls.schedule}/Vacation/GetVacations`,
  setVacations: `${BaseUrls.accountManagementScheduleMSGateWay}/v2/Vacation/SetVacations`,
  getRamadanSchedule: `${BaseUrls.schedule}/Schedule/GetRamdanSchedule`,

  getPatientRelativeTypes: `${BaseUrls.patients}/Patients/GetPatientRelativeTypes`,
  getPatientByKeyUrl: `${BaseUrls.patients}/Patients/GetPatientsByPatientKeys`,
  searchPatientsByKeyword: `${BaseUrls.patients}/Patients/GetPatientsList`,
  createPatient: `${BaseUrls.patients}/Patients/AddPatients`,
  editPatient: `${BaseUrls.patients}/Patients/EditPatient`,
  deletePatientByKeyUrl: `${BaseUrls.patients}/Patients/DeletePatients`,

  fetchAppointmentsUrl: `${BaseUrls.appointments}/Reservation/GetReservationDetails`,
  createAppointmentUrl: `${BaseUrls.appointments}/Reservation/UpsertReservations`,
  editAppointmentUrl: `${BaseUrls.appointments}/Reservation/UpsertReservationsV2`,
  markAppointmentAsNoShow: `${BaseUrls.appointments}/Reservation/MarkReservationsAsNoShow`,
  undoAppointmentNoShow: `${BaseUrls.appointments}/Reservation/UndoNoShowReservations`,
  checkInAppointment: `${BaseUrls.appointments}/Reservation/UpdateReservationsStatus`,
  cancelAppointment: `${BaseUrls.appointments}/Reservation/CancelReservations`,
  countReservationsInRange: `${BaseUrls.appointments}/Reservation/CountReservationsInRange`,
  updateReservationsInsurance: `${BaseUrls.appointments}/Reservation/UpdateReservationsInsurance`,

  getAllSpecialities: `${BaseUrls.vezeetaNative}/Specialities/GetMainSpecialities`,
  getMainSpecialities: `${BaseUrls.vezeetaNative}/Specialities/GetMainSpecialities`,
  getSubSpecialities: `${BaseUrls.vezeetaNative}/Specialities/GetSubSpecialities`,
  getDoctorSpecialty: `${BaseUrls.vezeetaNative}/DoctorSpecialities/GetMainSpecialtyByAccountKey`,

  validateToken: `${BaseUrls.accountManagement}/Account/ValidateToken`,
  reGenerateToken: `${BaseUrls.accountManagement}/Account/ReGenerateToken`,
  getAccountByKey: `${BaseUrls.accountManagement}/Account/GetAccountByKey`,
  getAccountsByKeys: `${BaseUrls.accountManagement}/Account/GetAccountsByKeys`,
  getAccountStructure: `${BaseUrls.accountManagementAPIsGateWay}/Account/GetAccountStructure`,
  signOut: `${BaseUrls.accountManagement}/Account/SignOut`,

  sso: {
    validateToken: `${BaseUrls.accountManagement}/Account/ValidateToken`,
  },

  account: {
    getAccountByKey: `${BaseUrls.accountManagement}/Account/GetAccountByKey?accountKey=`,
    registerAccount: `${BaseUrls.accountManagementAPIsGateWay}/Account/RegisterAccount`,
    saveProfilePhoto: `${BaseUrls.accountManagement}/Account/SaveProfilePhoto`,
    signIn: `${BaseUrls.accountManagement}/Account/SignIn`,
    socialSignIn: `${BaseUrls.accountManagement}/Account/SocialSignIn`,
    editAccount: `${BaseUrls.accountManagementAPIsGateWay}/v2/Account/EditBasicInfo`,
    getAccount: `${BaseUrls.accountManagement}/Account/GetBasicInfo`,
    sendForgetPasswordMessage: `${BaseUrls.accountManagement}/Messaging/SendForgetPasswordMessage`,
    updatePassword: `${BaseUrls.accountManagement}/Account/UpdatePassword`,
    setUserDefaultLangauge: `${BaseUrls.accountManagement}/Account/SetUserDefaultLanguage`,
  },

  offers: {
    getHealthGroups: `${BaseUrls.offers}/home/GetHealthGroupsAndRelatedServices`,
    getChildrenServices: `${BaseUrls.offers}/home/GetServiceChilds`,
    getUnitsPerCountry: `${BaseUrls.offers}/Attribute/GetUnitsPerCountry`,
    getOffers: `${BaseUrls.offers}/provider/GetProviderOffers`,
    addOffer: `${BaseUrls.offersGateway}/provider/addservice`,
    editOffer: `${BaseUrls.offersGateway}/provider/editservice`,
    redeemCode: `${BaseUrls.offers}/provider/RedeemCode`,
  },

  entity: {
    getCategoriesAndTypes: `${BaseUrls.accountManagement}/Entity/GetEntitiesCategoriesAndTypes`,
    addEntityImage: `${BaseUrls.accountManagement}/Entity/AddEntityImage`,
    createEntity: `${BaseUrls.accountManagement}/Entity/UpsertEntity`,
    getEntity: `${BaseUrls.accountManagement}/Entity/GetClinic`,
    GetBranchInsurances: `${BaseUrls.accountManagement}/Entity/GetBranchInsurances`,
    UpsertBranchInsurances: `${BaseUrls.accountManagement}/Entity/UpsertBranchInsurances`,
  },

  aman: {
    providers: `${BaseUrls.aman}/providers`,
    signUp: `${BaseUrls.aman}/providers/signup`,
  },

  assistant: {
    getAssistants: `${BaseUrls.accountManagement}/Account/GetAssistants?entityKey=`,
    addAssistant: `${BaseUrls.accountManagement}/Account/CreateAssistant`,
    toggleAssistantState: `${BaseUrls.accountManagement}/Account/ToggleAssistantState`,
  },

  payment: {
    getSalesForceInvoice: `${BaseUrls.crmGateWay}/salesforce/invoices`,
    getPaymentTypes: `${BaseUrls.payment}/PaymentMethod/GetPaymentTypesAndMethods?`,
    getPaymentCycles: `${BaseUrls.accountManagement}/Payment/GetPaymentCycles?productLineId=`,
    getAccountPaymentDetails: `${BaseUrls.payment}/Account/GetAccountPaymentDetails?accountkey=`,
    checkIfAccountHasCards: `${BaseUrls.payment}/Account/CheckIfAccountHasCards`,
    setPaymentDetails: `${BaseUrls.payment}/Account/SetAccountPaymentTypeAndMethod`,
    getCountryPaymentAttributes: `${
      BaseUrls.accountManagement
    }/Payment/GetCountryPaymentAttributes`,
    addAccountCardAndGetMerchantPageInfo: `${
      BaseUrls.payment
    }/Payfort/AddAccountCardAndGetMerchantPageInfo`,
    updateAndChargeAccountCard: `${BaseUrls.payment}/Payfort/UpdateAndChargeAccountCard?`,
    submitAccountChargeResponse: `${BaseUrls.payment}/Payfort/SubmitChargeAccountCardResponse?`,
    addTransaction: `${BaseUrls.payment}/Transaction/AddTransaction`,
    setPaymentMethod: `${BaseUrls.accountManagement}/Payment/SetPaymentMethod`,
    getTransactionByTransactionKey: `${
      BaseUrls.accountManagementPaymentGateWay
    }/Transaction/GetValidTransactionByTransactionKey?transactionKey=`,
  },

  verification: {
    verifyPhone: `${BaseUrls.accountManagement}/Verification/VerifyPhone`,
    sendPhoneVerificatoinCode: `${
      BaseUrls.accountManagement
    }/Verification/SendPhoneVerificatoinCode`,
  },

  productLines: {
    getProductLines: `${BaseUrls.accountManagement}/ProductLine/GetProductLines`,
    getEditableProductLines: `${BaseUrls.accountManagement}/ProductLine/GetClinicDetails`,
    upsertBranches: `${BaseUrls.accountManagement}/ProductLine/UpsertBranches`,
    getRegisteredProductLines: `${
      BaseUrls.accountManagement
    }/ProductLine/GetRegisteredProductLines`,
    customizeBook: `${BaseUrls.accountManagement}/ProductLine/CustomizeBook`,
    customizeCare: `${BaseUrls.accountManagement}/ProductLine/CustomizeCare`,
    getSpecialityGroups: `${BaseUrls.accountManagement} /Speciality/GetSpecialityGroups`,
    getCustomizeCare: `${BaseUrls.accountManagement}/ProductLine/GetCustomizeCare`,
    getCustomizeBook: `${BaseUrls.accountManagement}/ProductLine/GetCustomizeBook`,
    deleteBook: `${BaseUrls.accountManagement}/ProductLine/DeleteBook`,
    getCartDetails: `${BaseUrls.accountManagement}/ProductLine/GetCartDetails`,
    addFinalProductLines: `${BaseUrls.accountManagement}/ProductLine/AddFinalProductLines`,
    getProductPricings: `${BaseUrls.accountManagement}/ProductLine/GetPriceTypes?productLineId=`,
  },

  country: {
    detectCountry: `${BaseUrls.accountManagement}/Country/DetectCountry?ipAddress=`,
    getCountryCodes: `${BaseUrls.static}/Country/GetCountryCodes`,
    getAllCountries: `${BaseUrls.static}/country/GetAllCountries`,
    getCountries: `${BaseUrls.static}/Country/GetCountries`,
  },

  speciality: {
    getSpecialityGroups: `${BaseUrls.accountManagement}/Speciality/GetSpecialityGroups`,
  },

  security: {
    getIsValidPasswordToken: `${BaseUrls.accountManagement}/Security/IsValidPasswordToken?token=`,
  },

  updatePaymentMethod: `${BaseUrls.salesForce}/Accounts/UpdatePaymentMethod`,

  profile: `${BaseUrls.profile}`,

  linkUsers: `${BaseUrls.accountManagement}/Invitation/LinkUsers`,

  prescription: {
    addPrescription: `${BaseUrls.prescription}/prescription/upsertprescription`,
    getPrescription: `${BaseUrls.prescription}/prescription/getprescription?operationKey=`,
  },

  homeVisits: {
    getPatientLocationDetails: `${BaseUrls.homeVisits}/request/details?operationkey=`,
    getDoctorStats: `${BaseUrls.homeVisits}/Supplier/statsbydate`,
    getDoctorsLiveStatus: `${BaseUrls.homeVisits}/Supplier/suppliersactivity`,
  },

  sponseredAds: {
    getCampaigns: `${BaseUrls.accountManagementAdsGateWay}/campaigns/upcoming/bulk-queries`,
    placeBid: `${BaseUrls.accountManagementAdsGateWay}/bids/place`,
  },
};

export default Urls;
