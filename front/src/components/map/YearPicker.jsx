import React from 'react'

import { css } from 'emotion'

import {Card, CardText} from 'material-ui/Card'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import Slider from 'material-ui/Slider'


const YearPicker = (props) => (
    <Card className={cardWithMargins}>
        <CardText>
            <div className={bottomFlexRow}>
                <p>{props.range.start}</p>
                <p className={largeText}>{props.year}</p>
                <p>{props.range.end}</p>
            </div>

            <div className={fullColumn}>
                <Slider
                    min={props.range.start}
                    max={props.range.end}
                    step={1}
                    value={props.year}
                    onChange={ (event, value) => props.handleChangeYear(value) }
                />
            </div>

            <RadioButtonGroup
                name="metrics"
                defaultSelected={props.metric}
                onChange={ (event, value) => props.handleChangeMetric(value) }
            >
                <RadioButton value="import" label="Импорт" />
                <RadioButton value="export" label="Экспорт" />
            </RadioButtonGroup>

            <br/>
            <Checkbox
                label="Скрыть Москву и Санкт-Петурбург"
                checked={props.regional}
                onCheck={props.handleUpdateRegional}
            />
        </CardText>
    </Card>
);

export default YearPicker;


const cardWithMargins = css`
    margin-bottom: 2rem;
`;

const bottomFlexRow = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`;

const largeText = css`
    font-size: 1.2rem;
`;

const fullColumn = css`
    width: 100%;
`;
