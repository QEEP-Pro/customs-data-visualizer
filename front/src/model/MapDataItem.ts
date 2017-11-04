import City from './City'
import { Metric } from './Metric'


class MapDataItem {
    city: City
    import: {
        radius: number
        amount: number
    }
    export: {
        radius: number
        amount: number
    }

    constructor(item: any) {
        this.city = {
            uid: item.city.uid,
            name: item.city.name,
            lon: item.city.lon,
            lat: item.city.lat,
        } as City
        this.import = {
            radius: parseFloat(item.import.radius),
            amount: parseInt(item.import.amount, 10),
        }
        this.export = {
            radius: parseFloat(item.export.radius),
            amount: parseInt(item.export.amount, 10),
        }
    }

    getRadiusByMetric(metric: Metric) {
        return (metric === Metric.Import) ? this.import.radius : this.export.radius
    }
}

export default MapDataItem
