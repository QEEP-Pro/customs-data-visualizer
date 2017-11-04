import * as React from 'react'

import { Line } from 'react-chartjs-2'
const Color = require('color')

import { Metric } from '../../model/Metric'

import getMetricColor from '../../utils/getMetricColor'
import addSpacesToNumber from '../../utils/addSpacesToNumber'


interface Props {
    data: Dataset[]
}

export default (props: Props) => (
    <Line
        data={{
            labels: props.data.map((ds: Dataset) => ds.year.toString()),
            datasets: [
                {
                    label: 'Импорт',
                    data: props.data.map((ds: Dataset) => ({
                        x: ds.year,
                        y: ds.import
                    })),
                    borderColor: getMetricColor(Metric.Import),
                    backgroundColor: Color(getMetricColor(Metric.Import)).alpha(0.3).string(),
                },
                {
                    label: 'Экспорт',
                    data: props.data.map((ds: Dataset) => ({
                        x: ds.year,
                        y: ds.export
                    })),
                    borderColor: getMetricColor(Metric.Export),
                    backgroundColor: Color(getMetricColor(Metric.Export)).alpha(0.3).string(),
                },
            ]
        }}
        options={{
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                },
            },
            tooltips: {
                mode: 'x',
                callbacks: {
                    label: (item: any, data: any) =>
                        `${data.datasets[item.datasetIndex].label}: ${addSpacesToNumber(item.yLabel)} $`,
                },
            },
            scales: {
                yAxes: [{
                    ticks: {
                        callback: (value: any, _1: any, _2: any[]) => `${addSpacesToNumber(value)} $ `,
                        min: 0,
                    },
                }],
            },
            legend: {
                position: 'bottom',
            }
        }}
    />
)

interface Dataset {
    year: number
    import: number
    export: number
}