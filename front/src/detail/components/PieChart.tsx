import * as React from 'react'

const randomColor = require('randomcolor')
const Color = require('color')

import { Pie } from 'react-chartjs-2'

import addSpacesToNumber from '../../utils/addSpacesToNumber'


interface Props {
    data: Dataset[]
}

export default (props: Props) => (
    <Pie
        data={{
            labels: props.data.map((ds: Dataset) => ds.country
            ),
            datasets: [{
                data: props.data.map((ds: Dataset) => ds.amount
                ),
                backgroundColor: props.data.map((ds: Dataset) => Color(randomColor()).alpha(0.7).string()
                ),
            }],
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
                callbacks: {
                    label: (item: any, data: any) =>
                        `${data.labels[item.index]}: 
                            ${addSpacesToNumber(data.datasets[item.datasetIndex].data[item.index])} $`,
                },
            },
            legend: {
                position: 'left',
            },
            cutoutPercentage: 40,
        }}
    />
)

interface Dataset {
    country: string,
    amount: number,
}