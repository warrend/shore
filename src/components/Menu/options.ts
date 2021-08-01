import { MENU_RESET, RESET_URL } from '../../constants';

type Option = {
  path: string;
  text: string;
};

type Options = Option[];

// eslint-disable-next-line import/prefer-default-export
export const options: Options = [
  {
    path: RESET_URL,
    text: MENU_RESET,
  },
  // {
  //   path: RESET_URL,
  //   text: MENU_ABOUT,
  // },
  // {
  //   path: RESET_URL,
  //   text: MENU_STATS,
  // },
];
