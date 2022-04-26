const noSpaces = /^\S*$/;
const noNumbers = /^([^0-9\u0660-\u0669]*)$/;
const noSpecialChar = /^[\u0660-\u0669\u0621-\u064Aa-zA-Z0-9 ]*$/;

// Special regex for `Entity` & `Branch` names
const entityBranchSpecialChar = /^[\u0660-\u0669\u0621-\u064Aa-zA-Z0-9 ()-]*$/;
const max255Char = /^.{0,255}$/;
const max500Char = /^.{0,500}$/;
const passwordLength = /^.{8,50}$/;
const oneNumber = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
const oneCharacter = /[a-zA-Z]|[\u0621-\u064A]/;
const email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const allNum = /^[\d]+$|^[\u0660-\u0669]+$/;
const numbersOnly = /^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/;
const creditCardNumber = /^((4\d{3})|(5[1-5]\d{2})|(6011)|(34\d{1})|(37\d{1}))-?\s?\d{4}-?\s?\d{4}-?\s?\d{4}|3[4,7][\d\s-]{15}$/;
const month = /^(0?[1-9]|1[012])$/;
const year = /^\d{2}$/;
const cvv = /^[0-9]{3,4}$/;
const noArabicCharacters = /^([^\u0660-\u0669\u0621-\u064A]*)$/;
const noArabicNumber = /^([^\u0660-\u0669]*)$/;
const noArabicLetters = /^([^\u0621-\u064A]*)$/;
const noEnglishCharacters = /^([^0-9a-zA-Z]*)$/;
const noEnglishNumber = /^([^0-9]*)$/;
const noEnglishLetters = /^([^a-zA-Z]*)$/;
const oneArabicCharacter = /[\u0621-\u064A]/;
const oneEnglishCharacter = /[a-zA-Z]/;
const numberWithDecimals = /^\d+(?:\.\d{0,2})?$/;
// const fees = /^\d+\.?\d{0,2}$/;
const serviceUrl = /^[\u0660-\u0669\u0621-\u064Aa-zA-Z0-9 _-]*$/;
const noZeroValue = /^(?=.*?[1-9])\d+(\.\d+)?$/;

export default {
  humanName: [
    {
      regex: oneCharacter,
      errorMessage: {
        en: 'Enter name with at least one character',
        ar: 'يجب ادخال حرف أبجدي واحد على الأقل',
      },
    },
    {
      regex: noNumbers,
      errorMessage: {
        en: 'Enter name with no numbers',
        ar: 'غير مسموح بالأرقام في خانة الاسم',
      },
    },
    {
      regex: noSpecialChar,
      errorMessage: {
        en: 'Enter name with no special characters',
        ar: 'غير مسموح بالحروف الخاصة في خانة الاسم',
      },
    },
    {
      regex: max255Char,
      errorMessage: {
        en: '255 characters allowed',
        ar: 'مسموح ب ٢٥٥ حرف فقط',
      },
    },
  ],
  deviceName: [
    {
      regex: oneCharacter,
      errorMessage: {
        en: 'Enter at least one character',
        ar: 'ادخل حرف واحد على الأقل',
      },
    },
    {
      regex: noSpecialChar,
      errorMessage: {
        en: 'No special characters allowed',
        ar: 'غير مسموح بالحروف الخاصة مثل: !٪&*',
      },
    },
  ],
  max500Characters: [
    {
      regex: max500Char,
      errorMessage: {
        en: 'Allowed 500 Characters',
        ar: 'مسموح ب ٥۰۰ حرف فقط',
      },
    },
  ],
  entityBranchName: [
    {
      regex: oneCharacter,
      errorMessage: {
        en: 'Enter name with at least one character',
        ar: 'يجب ادخال حرف أبجدي واحد على الأقل',
      },
    },
    {
      regex: entityBranchSpecialChar,
      errorMessage: {
        en: 'Special characters allowed are "(", "-", ")"',
        ar: 'الحروف الخاصة المسموح بها: ")"، "(" ،"-"',
      },
    },
    {
      regex: max255Char,
      errorMessage: {
        en: '255 characters allowed',
        ar: 'مسموح ب ٢٥٥ حرف فقط',
      },
    },
  ],
  password: [
    {
      regex: passwordLength,
      errorMessage: {
        en: 'Password length should be between 8 to 50 character',
        ar: 'كلمة المرور يجب أن تكون على الأقل ٨ حروف وأقل من ٥٠ حرف',
      },
    },
    {
      regex: oneNumber,
      errorMessage: {
        en: 'Password should contain 1 number and 1 character at least',
        ar: 'كلمة المرور يجب أن تحتوي على رقم وحرف على الأقل',
      },
    },
    {
      regex: noSpaces,
      errorMessage: {
        en: 'Password should not contain spaces',
        ar: 'كلمة المرور لا يجب أن تحتوي على مسافات',
      },
    },
  ],
  email: [
    {
      regex: noSpaces,
      errorMessage: {
        en: 'Email should not contain space',
        ar: 'البريد الإلكتروني لا يجب أن يحتوي على مسافات',
      },
    },
    {
      regex: email,
      errorMessage: {
        en: 'Email not valid',
        ar: 'البريد الإلكتروني غير صحيح',
      },
    },
    {
      regex: max255Char,
      errorMessage: {
        en: '255 characters allowed',
        ar: 'مسموح ب ٢٥٥ حرف فقط',
      },
    },
  ],
  phoneNumber: [
    {
      regex: allNum,
      errorMessage: {
        en: 'Mobile number not valid',
        ar: 'رقم الهاتف غير صحيح',
      },
    },
  ],
  creditCard: [
    {
      regex: creditCardNumber,
      errorMessage: {
        en: 'Enter a valid credit card number',
        ar: 'أدخل رقم بطاقة ائتمان صحيح',
      },
    },
  ],
  year: [
    {
      regex: year,
      errorMessage: {
        en: 'Year not valid',
        ar: 'السنة غير صحيحة',
      },
    },
  ],
  month: [
    {
      regex: month,
      errorMessage: {
        en: 'Month not valid',
        ar: 'الشهر غير صحيح',
      },
    },
  ],
  cvv: [
    {
      regex: cvv,
      errorMessage: {
        en: 'CVV not valid',
        ar: 'رقم تحقق البطاقة غير صحيح',
      },
    },
  ],
  noEnglishNumbers: [
    {
      regex: noEnglishNumber,
      errorMessage: {
        en: 'Arabic characters only allowed',
        ar: 'مسموح بالحروف العربية فقط',
      },
    },
  ],
  noArabicNumberOnly: [
    {
      regex: noArabicNumber,
      errorMessage: {
        en: 'English characters are only allowed',
        ar: 'مسموح بالحروف الإنجليزية فقط',
      },
    },
  ],
  noArabicLetters: [
    {
      regex: noArabicLetters,
      errorMessage: {
        en: 'English characters are only allowed',
        ar: 'مسموح بالحروف الإنجليزية فقط',
      },
    },
  ],
  noEnglishLetters: [
    {
      regex: noEnglishLetters,
      errorMessage: {
        en: 'Arabic characters only allowed',
        ar: 'مسموح بالحروف العربية فقط',
      },
    },
  ],
  noEnglishText: [
    {
      regex: noEnglishCharacters,
      errorMessage: {
        en: 'Arabic characters only allowed',
        ar: 'مسموح بالحروف العربية فقط',
      },
    },
  ],
  noArabicText: [
    {
      regex: noArabicCharacters,
      errorMessage: {
        en: 'English characters are only allowed',
        ar: 'مسموح بالحروف الإنجليزية فقط',
      },
    },
  ],
  oneCharacterAtLeast: [
    {
      regex: oneCharacter,
      errorMessage: {
        en: 'Enter at least one character',
        ar: 'ادخل حرف واحد على الأقل',
      },
    },
  ],
  oneArabicCharacterAtLeast: [
    {
      regex: oneArabicCharacter,
      errorMessage: {
        en: 'Arabic characters only allowed',
        ar: 'مسموح بالحروف العربية فقط',
      },
    },
  ],
  oneEnglishCharacterAtLeast: [
    {
      regex: oneEnglishCharacter,
      errorMessage: {
        en: 'English characters are only allowed',
        ar: 'مسموح بالحروف الإنجليزية فقط',
      },
    },
  ],
  fees: [
    {
      regex: allNum,
      errorMessage: {
        en: 'Fees not valid',
        ar: 'سعر الكشف غير صحيح',
      },
    },
  ],
  noZeroValue: [
    {
      regex: noZeroValue,
      errorMessage: {
        en: 'Fees should not be zero',
        ar: 'سعر الكشف لا يمكن ان يساوي صفر',
      },
    },
  ],
  numberWithDecimals: [
    {
      regex: numberWithDecimals,
      errorMessage: {
        en: 'Not valid input',
        ar: 'ادخال غير صحيح',
      },
    },
  ],
  numbersOnly: [
    {
      regex: noSpaces,
      errorMessage: {
        en: 'Spaces are not allowed',
        ar: 'لا يُسمح بالمسافات',
      },
    },
    {
      regex: numbersOnly,
      errorMessage: {
        en: 'Must be a number',
        ar: 'يجب أن يكون رقم',
      },
    },
    {
      regex: noSpecialChar,
      errorMessage: {
        en: 'Special Characters not allowed',
        ar: 'الحروف الخاصة غير مسموع بها',
      },
    },
  ],
  serviceUrl: [
    {
      regex: noSpaces,
      errorMessage: {
        en: 'URL should not contain space',
        ar: 'الرابط لا يجب أن يحتوي على مسافات',
      },
    },
    {
      regex: oneCharacter,
      errorMessage: {
        en: 'URL should have at least one character',
        ar: 'البريد الإلكتروني لا يجب أن يحتوي على حرف واحد على الأقل',
      },
    },
    {
      regex: serviceUrl,
      errorMessage: {
        en: 'Special characters allowed are "-", "_"',
        ar: 'الحروف الخاصة المسموح بها: "-", "_"',
      },
    },
  ],
};
