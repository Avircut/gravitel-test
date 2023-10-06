import { makeVar } from '@apollo/client';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

export const isAuthVar = makeVar(!!localStorage.getItem(USER_LOCALSTORAGE_KEY));
