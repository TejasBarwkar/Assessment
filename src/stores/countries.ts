import { defineStore } from 'pinia'
import type { ICountry } from '@/types/Country'
import http from '../services/api'
import type { DropdownOption } from '@/types'
import { getCountryFormData } from '@/components/AddCountry/helpers'
import type { ICountryForm } from '@/components/AddCountry/types'

interface ICountryStore {
  countries: ICountry[]
  country: ICountry | null
  continents: string[]

  // Normalized state for countries
  countriesById: { [key: string]: ICountry }

  // Loader
  isLoading: boolean
  isCreating: boolean
}

export const useCountryStore = defineStore('countries', {
  state: (): ICountryStore => ({
    countries: [],
    country: null,
    continents: [],
    countriesById: {},
    isLoading: false,
    isCreating: false
  }),
  getters: {
    countryOptions(state): DropdownOption[] {
      return state.countries.map((country) => ({
        label: country.name,
        value: country.id
      }))
    },
    continentOptions(state): DropdownOption[] {
      return state.continents.map((continent) => ({
        label: continent,
        value: continent
      }))
    }
  },
  actions: {
    async getCountries() {
      try {
        const response = await http.get<ICountry[]>(`/countries`)
        this.countries = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async getContinents() {
      try {
        const response = await http.get<string[]>(`/continents`)
        this.continents = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async getCountryById(countryId: string) {
      if (countryId in this.countriesById) {
        this.country = this.countriesById[countryId]
        return
      }

      this.isLoading = true

      try {
        const response = await http.get<ICountry>(`/country/${countryId}`)
        const country = response.data
        this.country = country

        this.countriesById[country.id] = country
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async addCountry(country: ICountryForm) {
      this.isCreating = true

      try {
        const formData = getCountryFormData(country)
        const response = await http.post(`/country`, formData)

        if (response.status === 201 && response.data.success) {
          const country: ICountry = response.data.data
          this.countries.push(country)
        }

        return response.data
      } catch (error: any) {
        if (error.response && error.response.status === 400 && !error.response.data.success) {
          return error.response.data
        } else {
          console.error(error)
        }
      } finally {
        this.isCreating = false
      }
    }
  }
})
