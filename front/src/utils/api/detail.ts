import axios from 'axios'

import { HOSTNAME, PORT } from './settings'

import Category from '../../model/Category'
import DetailDataItem from '../../model/DetailDataItem'
import CountryDataItem from '../../model/CountryDataItem'


export const fetchCategories = (regionId: number) =>
    axios.get(`http://${HOSTNAME}:${PORT}/regionCategories?uid=${regionId}`)
        .then(data => data.data.map((item: any) => ({
            name: item.name,
            uid: parseInt(item.uid, 10)
        } as Category)))

export const fetchTotals = (regionId: number) =>
    axios.get(`http://${HOSTNAME}:${PORT}/regionTotals?uid=${regionId}`)
        .then(data => {
            const years = data.data
            return Object.keys(years).map((yearKey: string) => {
                const countries = years[yearKey].countries
                return {
                    year: parseInt(yearKey, 10),
                    import: years[yearKey].import,
                    export: years[yearKey].export,
                    countries: Object.keys(countries).map((countryKey: string) => ({
                        name: countryKey,
                        import: countries[countryKey].import,
                        export: countries[countryKey].export,
                    } as CountryDataItem))
                } as DetailDataItem
            })
        })

export const fetchIndustry = (regionId: number, industryId: number) =>
        axios.get(`http://${HOSTNAME}:${PORT}/regionData?uid=${regionId}&industryId=${industryId}`)
            .then(data => {
                const years = data.data

                return Object.keys(years)
                    .filter((key: string) => !isNaN(parseInt(key, 10)))
                    .map((yearKey: string) => {
                        const countries = years[yearKey].countries
                        return {
                            year: parseInt(yearKey, 10),
                            import: years[yearKey].import,
                            export: years[yearKey].export,
                            countries: Object.keys(countries).map((countryKey: string) => ({
                                name: countryKey,
                                import: countries[countryKey].import,
                                export: countries[countryKey].export,
                            } as CountryDataItem))
                        } as DetailDataItem
                    })
            })