import type { ICountryForm, ICountryFormError } from './types'

export const COUNTRY_FORM_INITIAL_DATA: ICountryForm = {
  name: '',
  rank: null,
  continent: '',
  flag: null
}

export const COUNTRY_FORM_ERROR_INITIAL_DATA: ICountryFormError = {
  name: '',
  rank: '',
  continent: '',
  flag: ''
}

export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
export const MAX_FILE_SIZE_IN_MB = 4
