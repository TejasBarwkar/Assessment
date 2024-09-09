export interface ICountryForm {
  name: string
  continent: string
  flag: File | null
  rank: number | null
}

export interface ICountryFormError {
  name: string
  rank: string
  continent: string
  flag: string
}
