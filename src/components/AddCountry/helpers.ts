import type { ICountryForm } from './types'

export const getCountryFormData = (country: ICountryForm): FormData => {
  const formData = new FormData()
  const { name, rank, flag, continent } = country

  formData.append('name', name)

  if (rank) {
    formData.append('rank', rank.toString())
  }

  if (flag) {
    formData.append('flag', flag)
  }

  formData.append('continent', continent)

  return formData
}
