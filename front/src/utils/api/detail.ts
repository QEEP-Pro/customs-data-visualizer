import axios from 'axios'

import { HOSTNAME, PORT } from './settings'

import Category from '../../model/Category'
import DetailDataItem from '../../model/DetailDataItem'
import CountryDataItem from '../../model/CountryDataItem'


export const fetchCategories = (regionId: number) =>
    axios.get(`http://${HOSTNAME}:${PORT}/region?uid=${regionId}`)
        .then(data => data.data.menu.map((item: any) => ({
            name: item.name,
            uid: parseInt(item.uid, 10)
        } as Category)))

export const fetchTotals = (regionId: number) =>
    axios.get(`http://${HOSTNAME}:${PORT}/region?uid=${regionId}`)
        .then(data => {
            const years = data.data.totals
            return Object.keys(years).map((yearKey: string) => {
                const countries = years[yearKey].countries
                return {
                    year: parseInt(yearKey, 10),
                    import: years[yearKey].import.amount,
                    export: years[yearKey].export.amount,
                    countries: Object.keys(countries).map((countryKey: string) => ({
                        name: countryKey,
                        import: countries[countryKey].import.amount,
                        export: countries[countryKey].export.amount,
                    } as CountryDataItem))
                } as DetailDataItem
            })
        })