import * as React from 'react'

import { css } from 'emotion'

import { Card, CardText } from 'material-ui/Card'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import Slider from 'material-ui/Slider'

import { Metric, getMetricName } from '../../model/Metric'
import TimeRange from '../../model/TimeRange'


interface Props {
    metric: Metric
    handleChangeMetric: (value: Metric) => void

    regional: boolean
    handleChangeRegional: (value: boolean) => void

    range: TimeRange
    year: number
    handleChangeYear: (value: number) => void
}

export default (props: Props) => (
    <Card>
        <CardText>
            <Slider
                min={props.range.start}
                max={props.range.end}
                step={1}
                value={props.year}
                onChange={(_: any, value: number) => props.handleChangeYear(value)}
            />

            <RadioButtonGroup
                name={'metrics'}
                defaultSelected={props.metric}
                onChange={(_: any, value: Metric) => props.handleChangeMetric(value)}
            >
                <RadioButton value={Metric.Import} label={getMetricName(Metric.Import)} className={metricStyle} />
                <RadioButton value={Metric.Export} label={getMetricName(Metric.Export)} className={metricStyle} />
            </RadioButtonGroup>

            <Checkbox
                label={'Скрыть Москву и Санкт-Петербург'}
                checked={props.regional}
                onCheck={(_: any, value: boolean) => props.handleChangeRegional(value)}
            />
        </CardText>
    </Card>
)

const metricStyle = css`
    width: 50% !important;
    float: left;
`
