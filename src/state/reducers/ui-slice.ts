import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TSupportedLanguages, getInitLanguage, setLanguage } from '../../i18n';

type SliceState = { language: TSupportedLanguages; isYoutubeDown: boolean };

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    language: getInitLanguage(),
    isYoutubeDown: false,
  } as SliceState,
  reducers: {
    setLanguage: (state, action: PayloadAction<TSupportedLanguages>) => ({
      ...state,
      language: action.payload,
    }),
    setIsYoutubeDown: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isYoutubeDown: action.payload,
    }),
  },
});

const uiThunks = {
  setLanguage: (language: TSupportedLanguages) => async (dispatch: any) => {
    setLanguage(language);
    localStorage.setItem('language', language);
    dispatch(uiSlice.actions.setLanguage(language));
  },
};

export { uiThunks };
export default uiSlice;
