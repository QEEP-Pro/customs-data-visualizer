import createMatcherFunction from '../utils/createMatcherFunction'


export type Metric = 'Import' | 'Export'
export const Metric = {
    Import: 'Import' as Metric,
    Export: 'Export' as Metric,
}

export const getMetricName = createMatcherFunction({
    [Metric.Import]: 'Импорт',
    [Metric.Export]: 'Экспорт',
})
