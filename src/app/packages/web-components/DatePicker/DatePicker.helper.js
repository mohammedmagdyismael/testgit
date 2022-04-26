/* eslint-disable import/prefer-default-export */
export const getInsuranceForDropDown = (insurances, language) => {
  const insurancesList = insurances.map(insurance => {
    const languageId = language === 'en' ? 1 : 2;
    const insuranceByLanguage = insurance.LanguageItemModels.filter(
      model => languageId === model.LanguageId,
    );
    return {
      fieldValue: insuranceByLanguage[0].Name,
      value: insurance.InsuranceKey,
      key: insurance.InsuranceKey,
      isEnabled: true,
      isChecked: false,
      extras: {},
    };
  });
  return insurancesList;
};
