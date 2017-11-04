import { Metric } from '../model/Metric'


export default (metric: Metric) => ({
    [Metric.Import]: '#9fa8da',
    [Metric.Export]: '#ffe082',
}[metric])
