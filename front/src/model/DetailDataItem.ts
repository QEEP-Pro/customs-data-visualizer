import CoutryDataItem from './CountryDataItem'


export default interface DetailDataItem {
    year: number
    import: number
    export: number
    countries: CoutryDataItem[]
}
