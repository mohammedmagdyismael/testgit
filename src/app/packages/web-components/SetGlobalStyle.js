import { injectGlobal } from 'styled-components';

/**
 * Using system font stack as a fallback is fonts took too much time to load or failed ot load
 */
const systemFontsStack =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const arabicFont = `TheSansArabic, ${systemFontsStack}`;
const englishFont = `SourceSansPro, ${systemFontsStack}`;
/**
 * Injecting global font family to all HTML nodes
 */
const setGlobalFonts = language => injectGlobal`
* {
  font-family: ${language === 'en' ? englishFont : arabicFont};
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  &:before,
  &:after {
    box-sizing: border-box;
  }

  button {
    cursor: pointer;

    &:disabled {
      cursor: default;
    }
  }

  &:lang(ar) {
    font-family: TheSansArabic, ${systemFontsStack};
  }
}
`;

export default setGlobalFonts;
