import type { ICountryForm, ICountryFormError } from './types'
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_IN_MB } from './constants'

const ERROR_MESSAGES = {
  name: {
    required: 'Name field is required',
    minLength: 'Name must be at least 3 characters long',
    maxLength: 'Name cannot exceed 20 characters'
  },
  flag: {
    required: 'Flag field is required',
    mime: 'Only JPG and PNG images are allowed',
    size: `Image size should not exceed ${MAX_FILE_SIZE_IN_MB} MB`
  },
  continent: {
    required: 'Continent field is required'
  },
  rank: {
    required: 'Rank field is required',
    min: 'Rank must be a greater than 0'
  }
}

export const validateCountry = (
  country: ICountryForm
): {
  hasError: boolean
  validationErrors: ICountryFormError
} => {
  const validationErrors: ICountryFormError = {
    name: validateName(country.name),
    rank: validateRank(country.rank),
    flag: validateFlag(country.flag),
    continent: country.continent.trim() ? '' : ERROR_MESSAGES.continent.required
  }

  let hasError: boolean = false
  if (Object.values(validationErrors).some((error) => error)) {
    hasError = true
  }

  return { hasError, validationErrors }
}

const validateName = (name: string): string => {
  const countryName = name.trim()

  if (countryName.length === 0) return ERROR_MESSAGES.name.required

  if (countryName.length < 3) return ERROR_MESSAGES.name.minLength
  if (countryName.length > 20) return ERROR_MESSAGES.name.maxLength
  return ''
}

const validateRank = (rank: number | null): string => {
  if (rank === null || rank.toString().length === 0) return ERROR_MESSAGES.rank.required

  if (rank < 1) return ERROR_MESSAGES.rank.min
  return ''
}

const validateFlag = (file: File | null): string => {
  if (!file) return ERROR_MESSAGES.flag.required

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return ERROR_MESSAGES.flag.mime
  }

  if (file.size > MAX_FILE_SIZE_IN_MB * 1024 * 1024) {
    return ERROR_MESSAGES.flag.size
  }

  return ''
}
